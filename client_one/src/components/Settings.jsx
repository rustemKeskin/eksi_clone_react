/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'

function Settings() {

  const user = useSelector(state => state.sharedData.user)
  function handleSubmit() {}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <dl>
          <dt>
            <label htmlFor="email">Email:</label>
          </dt>
          <dd>
            <input type="email" name="email" required placeholder="email" value={user.email} />
          </dd>

          <dt>
            <label htmlFor="username">Username:</label>
          </dt>
          <dd>
            <input type="text" name="username" placeholder="username" value={user.user_name} />
          </dd>

          <dt>
            <label htmlFor="password">Password:</label>
          </dt>
          <dd>
            <input type="password" name="password1" placeholder="password" />
          </dd>

          <dt>
            <label htmlFor="new_password1">New Password:</label>
          </dt>
          <dd>
            <input type="password" name="new_password1" placeholder="password" />
          </dd>

          <dt>
            <label htmlFor="new_password2">Confirm New Password:</label>
          </dt>
          <dd>
            <input type="password" name="new_password2" placeholder="password" />
          </dd>
        </dl>
        <input type="submit" value="Change" />
      </form>
    </div>
  );
}

export default Settings;
