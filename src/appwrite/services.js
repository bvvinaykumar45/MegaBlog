import { Client, Query, TablesDB } from "appwrite";
import config from "../config/config";

class Service {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  async createArticle({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error(`Service :: createArticle :: error`, error);
    }
  }

  async updateArticle(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error(`Service :: updateArticle :: error`, error);
    }
  }

  async deleteArticle(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error(`Service :: deleteArticle :: error`, error);
      return false;
    }
  }

  async getArticle(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.error(`Service :: getArticle :: error`, error);
      return false;
    }
  }

  async getArticles(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.error(`Service :: getArticles :: error`, error);
      return false;
    }
  }
}

const service = new Service();
export default service;
