import { fetch } from "./api.js";
import { fileUpload } from "@/utils";

// 登入
export const userLogin = body => {
  return fetch("POST", "/auth/login", body);
};

// 註冊
export const userRegister = body => {
  return fetch("POST", "/auth/register", body);
};

// 驗證碼圖片
export const captchaImg = body => {
  return fetch("GET", "/auth/captcha", body);
};

// 登出
export const userLogout = body => {
  return fetch("POST", "/user/logout", body);
};

// 取得輪播圖片
export const getBanners = body => {
  return fetch("GET", "/banner/getBanners", body);
};

// ############## 全域使用 ##############

// 銀行清單
export const getBankSelect = body => {
  return fetch("GET", "/bank/select", body);
};

// ############## 搜索職缺 ##############

// 取得國家地區 flag = 0:國內 1:海外
export const getArea = body => {
  return fetch("GET", "/area/tree", body);
};

// 取得職業領域
export const getJobCat = body => {
  return fetch("GET", "/job-cat/tree", body);
};

// 熱門區域列表
export const getAreaPopular = body => {
  return fetch("GET", "/area/popular", body);
};

// 熱門關鍵字
export const getKeywords = body => {
  return fetch("POST", "/keyword/popular", body);
};

// 搜索職缺
export const searchJobs = (body, pager) => {
  return fetch("POST", "/job-position/search", body, pager);
};

// 職缺詳細資訊
export const getJob = ({ id }) => {
  return fetch("GET", `/job-position/${id}`);
};

// 技能樹
export const getListSkillTree = (body, pager) => {
  return fetch("GET", "/skill/tree", body, pager);
};

// 會員訪問被分享職缺
export const accessShareJob = body => {
  return fetch("POST", "/user/accessShareJob", body);
};

// ############## 企業 ##############

// 前10熱門企業列表
export const getCompanyPopular = body => {
  return fetch("GET", "/owner/popular", body);
};

// 取得企業資訊
export const getCompany = ({ oid }) => {
  return fetch("GET", `/owner/${oid}`);
};

// ############## 文章 ##############

// 依照文章分類取得文章
export const getArticleCat = body => {
  return fetch("GET", "/article/getArticleByCategory", body);
};

// 取得隨機文章
export const getRandomArticle = body => {
  return fetch("GET", "/article/getRandomArticle", body);
};

// 取得單筆文章資料
export const getOneArticle = body => {
  return fetch("GET", "/article/getOne", body);
};

// 文章分頁查詢
export const getArticleList = body => {
  return fetch("POST", "/article/list", body);
};

// ############## 會員中心 ##############

// 會員中心-基本資料-取得基本資料
export const userGetUser = body => {
  return fetch("GET", "/user/getUser", body);
};
// 會員中心-基本資料-修改基本資料
export const userUpdateUser = body => {
  return fetch("POST", "/user/updateUserInfo", body);
};

// 會員中心-基本資料-取得家庭成員列表
export const userGetFamilyList = body => {
  return fetch("GET", "/userFamilyInfo/list", body);
};
// 會員中心-基本資料-新增家庭成員
export const userAddFamily = body => {
  return fetch("POST", "/userFamilyInfo/add", body);
};
// 會員中心-基本資料-修改家庭成員
export const userUpdateFamily = body => {
  return fetch("POST", "/userFamilyInfo/update", body);
};
// 會員中心-基本資料-刪除家庭成員
export const userDeleteFamily = body => {
  return fetch("POST", "/userFamilyInfo/delete", body);
};

// 會員中心-取得會員檔案
// type: 0 = 履歷表, 1 = 面試紀錄, 2 = 離職證明
export const getUserFiles = body => {
  return fetch("GET", "/user/files", body);
};
// 會員中心-上傳會員檔案
export const uploadUserFile = (body, callback) => {
  fileUpload("/user/uploadUserResumeFile", body, callback);
};
// 會員中心-移除會員檔案
export const removeUserFile = body => {
  return fetch("DELETE", "/user/files", body);
};
// 會員中心-我的履歷-取得履歷資訊
export const userGetUserResume = body => {
  return fetch("GET", "/user/getUserResume", body);
};
// 會員中心-我的履歷-修改履歷資訊
export const userUpdateUserResume = body => {
  return fetch("POST", "/user/updateUserResume", body);
};

// 會員中心-我的履歷-取得學歷列表
export const userGetEducationList = body => {
  return fetch("GET", "/userEducation/list", body);
};
// 會員中心-基本資料-新增學歷
export const userAddEducation = body => {
  return fetch("POST", "/userEducation/add", body);
};
// 會員中心-基本資料-修改學歷
export const userUpdateEducation = body => {
  return fetch("POST", "/userEducation/update", body);
};
// 會員中心-基本資料-刪除學歷
export const userDeleteEducation = body => {
  return fetch("POST", "/userEducation/delete", body);
};

// 會員中心-我的履歷-取得工作經歷列表
export const userGetExperienceList = body => {
  return fetch("GET", "/userExperience/list", body);
};
// 會員中心-基本資料-新增工作經歷
export const userAddExperience = body => {
  return fetch("POST", "/userExperience/add", body);
};
// 會員中心-基本資料-修改工作經歷
export const userUpdateExperience = body => {
  return fetch("POST", "/userExperience/update", body);
};
// 會員中心-基本資料-刪除工作經歷
export const userDeleteExperience = body => {
  return fetch("POST", "/userExperience/delete", body);
};

// 會員中心-我的履歷-取得會員技能列表
export const userGetSkillList = body => {
  return fetch("POST", "/userSkill/list", body);
};
// 會員中心-基本資料-新增會員技能
export const userAddSkill = body => {
  return fetch("POST", "/userSkill/add", body);
};
// 會員中心-基本資料-刪除會員技能
export const userDeleteSkill = body => {
  return fetch("POST", "/userSkill/delete", body);
};

// 會員中心-我的履歷-取得語言列表
export const userGetLanguageList = body => {
  return fetch("GET", "/userLanguage/list", body);
};
// 會員中心-基本資料-新增語言
export const userAddLanguage = body => {
  return fetch("POST", "/userLanguage/add", body);
};
// 會員中心-基本資料-修改語言
export const userUpdateLanguage = body => {
  return fetch("POST", "/userLanguage/update", body);
};
// 會員中心-基本資料-刪除語言
export const userDeleteLanguage = body => {
  return fetch("POST", "/userLanguage/delete", body);
};

// 會員中心-應徵職缺
export const userAddApplicant = body => {
  return fetch("POST", "/userApplicant/add", body);
};
// 會員中心-應徵記錄
export const userGetApplicantList = body => {
  return fetch("GET", "/userApplicant/list", body);
};
// 會員中心-取消應徵記錄
export const cancelUserApplicant = id => {
  return fetch("PATCH", `/userApplicant/${id}/cancel`, {});
};

// 會員中心-收藏記錄
export const userGetFavoriteJobList = body => {
  return fetch("GET", "/user/favorite/job", body);
};
// 會員中心-收藏記錄-新增
export const userAddFavoriteJob = body => {
  return fetch("POST", "/user/favorite/job", body);
};
// 會員中心-收藏記錄-移除
export const userRemoveFavoriteJob = body => {
  return fetch("DELETE", "/user/favorite/job", body);
};

// 會員中心-推薦記錄
export const userGetReferList = body => {
  return fetch("GET", "/user/refer", body);
};

// 會員中心-推薦-取得會員分享碼
export const userGetReferCode = body => {
  return fetch("GET", "/user/referCode", body);
};

// 會員中心-提领記錄
export const userGetWithdrawAmount = body => {
  return fetch("GET", "/userWithdrawInfo/getWithdrawAmount", body);
};
// 會員中心-申請款項
export const userAddWithdraw = body => {
  return fetch("POST", "/userWithdrawInfo/addWithdrawHistory", body);
};
// 會員中心-取得提款資訊
export const userGetWithdrawInfo = body => {
  return fetch("GET", "/userWithdrawInfo/getWithdrawInfo", body);
};
// 會員中心-新增提款資訊
export const userAddWithdrawInfo = body => {
  return fetch("POST", "/userWithdrawInfo/add", body);
};
// 會員中心-提款紀錄
export const userListWithdraw = body => {
  return fetch("POST", "/userWithdrawInfo/listAll", body);
};
