import { getCurrentDate } from '../utils/date.util.js';
import { executeQuery } from '../utils/database.util.js';

// Create a user
const createUser = async ({
    full_name,
    status = 'Active',
    username,
    password,
    insertion_user,
    user_type,
    permissions = '[]'
}) => {
    const registration_date = getCurrentDate();
    const query = `
        INSERT INTO users (
        full_name, 
        status, 
        username,  
        password,  
        registration_date,  
        insertion_user, 
        user_type, 
        permissions
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    const values = [
        full_name,
        status,
        username,
        password,
        registration_date,
        insertion_user,
        user_type,
        permissions
    ];

    await executeQuery(query, values);
    return true;
};

// Find a user by username
const findByUsernameAndPassword = async (username) => {
    const query = `
    SELECT * FROM users
    WHERE username = $1 AND status = 'Active'
  `;
    const values = [username];
    const rows = await executeQuery(query, values);
    return rows[0] || null;
};

// Get all users
const findAllUsers = async () => {
    const query = `
      SELECT user_id, user_type, full_name, status, username, 
             TO_CHAR(registration_date, 'MM/DD/YYYY HH24:MI:SS') AS registration_date, 
             TO_CHAR(last_update_date, 'MM/DD/YYYY HH24:MI:SS') AS last_update_date, 
             insertion_user, update_user, permissions
      FROM users
      ORDER BY user_id ASC
    `;
    return await executeQuery(query);
};

// Update user by ID
const updateUserById = async ({
    user_id,
    full_name,
    status,
    password,
    update_user,
    user_type,
    permissions
  }) => {
    const last_update_date = getCurrentDate();
    const valuesBase = [
      user_id,
      full_name,
      status,
      update_user,
      last_update_date,
      user_type,
      permissions
    ];
  
    let query = `
      UPDATE users
      SET full_name = $2,
          status = $3,
          update_user = $4,
          last_update_date = $5,
          user_type = $6,
          permissions = $7
    `;
  
    if (password && password.trim()) {
      query += `, password = $8`;
      valuesBase.push(password);
    }
  
    query += ` WHERE user_id = $1`;
  
    await executeQuery(query, valuesBase);
    return true;
  };

export const UserModel = {
    createUser,
    findByUsernameAndPassword,
    findAllUsers,
    updateUserById
};