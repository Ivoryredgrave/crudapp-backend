import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { handleError } from "../utils/error.util.js";

// Login user
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = await UserModel.findByUsernameAndPassword(username);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
        res.json({
            ok: true,
            user: {
                full_name: user.full_name,
                user_type: user.user_type,
                permissions: JSON.parse(user.permissions),
            }
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { full_name, status = 'Active', username, password, insertion_user, user_type, permissions } = req.body;
    
    try {
        await UserModel.createUser({
            full_name,
            status,
            username,
            password,
            insertion_user,
            user_type,
            permissions: JSON.stringify(permissions || []),
        });

        res.status(201).json({ ok: true });
    } catch (error) {
        if (error.constraint === 'unique_username') {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        handleError(res, error);
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { user_type, full_name, status, password, update_user, permissions } = req.body;

    try {
        await UserModel.updateUserById({
            user_id: id,
            user_type,
            full_name,
            status,
            password,
            update_user,
            permissions: JSON.stringify(permissions || []),
        });

        res.status(200).json({ ok: true });
    } catch (error) {
        if (error.constraint === 'unique_username') {
            return res.status(409).json({ error: 'Username already exists.' });
        }
        handleError(res, error);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAllUsers();
        res.json(users);
    } catch (error) {
        handleError(res, error);
    }
};

export const userController = {
    login,
    createUser,
    updateUser,
    getAllUsers
};