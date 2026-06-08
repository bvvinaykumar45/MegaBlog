import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error(`Error: while creating User Account. - ${error.message}`);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      console.error(`Error: while logging in - ${error.message}`);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(`AuthService :: getCurrentUser :: error`, error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession({ sessionId: "current" });
    } catch (error) {
      console.error(`AuthService :: logout :: error`, error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
