change user_id data type from string to objectId, using mongosh

db.titles.updateMany( {}, [ { $set: { user_id: { $convert: { input: "$user_id", to: "objectId" } } } }] );

