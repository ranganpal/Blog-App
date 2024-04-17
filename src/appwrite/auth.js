import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      if (userAccount) {
        return this.login({ email, password });
      }
      else {
        return userAccount;
      }
    }
    catch (error) {
      console.log("Appwrite service :: createAccount :: error ::", error);
    }
  }
  
  async updateAccount({ email, oldPassword, newPassword, name }) {
    try {
      await this.account.updateEmail(email, oldPassword)
      await this.account.updatePassword(newPassword, oldPassword)
      return await this.account.updateName(name)
    }
    catch (error) {
      console.log("Appwrite service :: updateAccount :: error ::", error);
    }
  }
  
  async deleteAccount(userId) {
    try {
      console.log(userId);
      await this.account.deleteIdentity(userId)
      return true
    }
    catch (error) {
      console.log("Appwrite service :: deleteAccount :: error ::", error);
      return false
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    }
    catch (error) {
      console.log("Appwrite service :: login :: error ::", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    }
    catch (error) {
      console.log("Appwrite service :: logout :: error ::", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    }
    catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error ::", error);
    }

    return null;
  }
}

const authService = new AuthService();
export default authService;
