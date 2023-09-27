const {User} = require('../models/user');
const Title = require('../models/title');
const Entry = require('../models/entry')
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { IUser, ITitle, IEntry } from '../ts/interfaces/interfaces';

class MongoPersistence {

  constructor() {}

// ====================TITLES=====================

  // returns all titles - 1
  async getTitleList() : Promise<string[]> {

    let titleList = await Title.find({});
    return titleList.map((el : ITitle) => el.title).sort()
  }
  // validate title - 2
  async validateTitle(title : string) : Promise<boolean> {
      
    const valid = await Title.findOne({ title : title });
    return valid ? true : false;
  }
  // returns title - 3
  async getTitleById(titleId : string) {
    
    let newTitleId = new ObjectId(titleId);
    return (await Title.findOne({_id : newTitleId }))
  }
  // returns specific user's titles - 4
  async getTitles(username : string) {
    let userId = await this.getUserId(username);
    let newUserId = new ObjectId(userId);
    let result = await Title.find({ user_id: newUserId })
    return result.map((doc : ITitle) => doc.title);
  }
  // returns a title id - 5
  async getTitleId(title : string) {

    let result = await Title.findOne({title});
    return result ? result.id : false
  }
  // Delete title - 6
  async deleteTitle(title : string) {
    let title_id = await this.getTitleId(title);
    let result1 = await Title.findOneAndDelete({title});
    let newTitleId = new ObjectId(title_id);
    let result2 = await Entry.deleteMany({ title_id : newTitleId });
    return (result1 && result2) ? true : false
  }
  // Edit Title - 7
  async editTitle(newTitle : string, oldTitle : string) {

    let result = await Title.updateOne({title:oldTitle}, {title: newTitle});
    return result ? true : false
  }
  // Enter new title - 8
  async newTitle(title : string, userId : string) {

    const newTitle = new Title({
      title: title,
      user_id: new ObjectId(userId)
    });
  
    let result = await newTitle.save();
    return result ? true : false
  }
  // returns number of titles - 9
  async getNumberOfTitle() {
    return (await Title.countDocuments());
  }
  // get title info by name -10
  async getTitleByName(title:string) {
    return (await Title.find({title}));
  }
  // mongo specific function (Doesn't work)
  async getTitlesIds() {
    let result = await Title.find({})
    return result.map((doc : ITitle) => doc.id)
  }
// ====================USERS======================

  //  user authenticate - 11
  async authenticate(username : string, password : string) : Promise<boolean> {

    let user = await User.findOne({user_name : username});
    return bcrypt.compare(password, user.password);
  }
  //  user name validation-12
  async validateUserName(username : string) {
    const valid = await User.findOne({ user_name : username });
    return valid ? true : false;
  }
  //  user id validation-13
  async validateUserId(userId : string) {
    
    let newUserId = new ObjectId(userId);
    let valid = await User.findOne({_id : newUserId})
    return valid ? true : false;
  }
  // returns user info by name-14
  async getUserInfoByName(username : string) {
    return await User.findOne({user_name : username})
  }
  // returns user info by id-15
  async getUserInfoById(id : string) {

    let newUserId = new ObjectId(id);
    return await User.findOne({_id : newUserId})
  }
  // returns all usernames-16
  async getUserNames() {
    return (await User.find()).map((doc : IUser) =>doc.user_name);
  }
  // returns userid - 17
  async getUserId(username : string) : Promise<string> {
    
    return (await User.findOne({user_name : username}))._id
  }
  // returns all emails - 18
  async getEmails() {
    return (await User.find()).map((doc : IUser) => doc.email);
  }
  //  Sign Up a user - 19
  async signUp(username : string, email : string, password : string) {

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      user_name: username,
      email: email,
      password: hashedPassword,
    });
  
    // Save the new title to the database
    let result = await newUser.save();
    return result ? true : false
  }
  // Edit user name - 20
  async editUserName(newName : string, oldName : string) {
    
    let result = await User.updateOne({user_name:oldName}, {user_name:newName});
    return result ? true : false
  }
  // Edit user email - 21
  async editUserEmail(username : string, email : string) {
    
    let result = await User.updateOne({user_name:username}, {email});
    return result ? true : false
  }
  // Edit user password - 22
  async editUserPassword(username : string, newPassword : string) {
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
    
    let result = await User.updateOne({user_name:username}, {password : hashedPassword});
    return result ? true : false
  }
  // Delete title - 23
  async deleteUser(username : string) {

    let entries = await this.getMyEntries(username);

    entries.forEach(async(obj) => {
      try {
        await this.deleteEntry(obj.id);
      } catch( err ) {
        console.log("users's entry delete error : ", err);
      }
    });

    let titles = await this.getTitles(username);

    titles.forEach(async(title: string) => {
      try {
        await this.deleteTitle(title);
      } catch( err ) {
        console.log("users's title delete error : ", err);
      }
    });

    return await User.findOneAndDelete({user_name : username})
  }
// ====================ENTRIES====================

  // delete entry - 24
  async deleteEntry(itemId : string) {
    let id = new ObjectId(itemId);
    return await Entry.findOneAndDelete({_id:id})
  }
  // new entry - 25
  async newEntry(text : string, userId : string, titleId : string) {

    let user_id = new ObjectId(userId)
    let title_id = new ObjectId(titleId)
    const newEntry = new Entry({
      entry: text,
      user_id,
      title_id,
    });
    
    let result = await newEntry.save();
    return result ? true : false
  }
  // edit entry - 26
  async editEntry(itemId : string, newtext : string) {
    
    let entry_id = new ObjectId(itemId);
    return await Entry.updateOne({_id: entry_id}, {entry : newtext});
  }
  // return entries and users name who wrote content[will be deprecated dont use]
  async getEntries(title : string) {

    let id = await this.getTitleId(title);
    let titleId = new ObjectId(id.toString());

    let entries = (await Entry.find({title_id : titleId}))
    let result = [];

    for (let entry of entries) {

      delete entry.title_id;
      entry.title = title;
      let user = await this.getUserInfoById(entry.user_id.toString())

      result.push({
        entry : entry.entry,
        user_id : entry.user_id,
        title_id : entry.title_id,
        title : title,
        user_name : user.user_name,
        image_url : user.image_url,
      });
    }
    return result;
  }
  // Returns user's all entries - 28
  async getMyEntries(username : string) {
    
    let user_id = await this.getUserId(username);
    let userId = new ObjectId(user_id);
    let entries = await Entry.find({user_id:userId})
    let user = await User.findOne({user_name : username})

    let arr = [];

    for (let entry of entries) {
      arr.push({
        title : (await this.getTitleById(entry.title_id)).title,
        entry : entry.entry,
        id : entry._id,
        user_name : username,
        image_url : user.image_url
      })
    }

    return arr
  }
  // returns specific entry - 29
  async getEntry(itemId : string) {
    let item_id = new ObjectId(itemId);
    return await Entry.findOne({_id : item_id})
  }
  // returns all entries attached specific title - 30
  async getTitleEntries(titleId : string) {
    let newTitleId = new ObjectId(titleId);
    return await Entry.find({title_id : newTitleId});
  }
}



export { MongoPersistence };
