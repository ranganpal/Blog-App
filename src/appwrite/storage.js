import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class StorageService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Post Services

  async createPost({ title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      );
    }
    catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost({ title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      );
    }
    catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    }
    catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    }
    catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts() {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [
          Query.equal("status", "active")
        ]
      );
    }
    catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // File Services

  async createFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    }
    catch (error) {
      console.log("Appwrite service :: createFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    }
    catch (error) {
      console.log("Appwrite service :: createFile :: error", error);
      return false;
    }
  }

  getFliePreview(fileId) {
    try {
      this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    }
    catch (error) {
      console.log("Appwrite service :: getFliePreview :: error", error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
