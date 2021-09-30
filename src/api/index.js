export default {
  // 登入
  userLogin: () => ({ method: 'POST', url: '/auth/login' }),

  // 註冊
  userRegister: () => ({ method: 'POST', url: '/auth/register' }),

  // 驗證碼圖片
  captchaImg: () => ({ method: 'GET', url: '/auth/captcha' }),

  // 上傳履歷註冊 - 上傳檔案
  registerUploadFile: () => ({ method: 'POST', url: '/auth/uploadFile' }),

  // 帳號認證
  authVerify: () => ({ method: 'GET', url: '/auth/verify' }),

  // 登出
  userLogout: () => ({ method: 'POST', url: '/user/logout' }),

  // 取得輪播圖片
  getBanners: () => ({ method: 'GET', url: '/banner/getBanners' }),

  // ############## 全域使用 ##############

  // 銀行清單
  getBankSelect: () => ({ method: 'GET', url: '/bank/select' }),

  // 產業類別下拉式選單
  getIndustryCategoryTree: () => ({
    method: 'GET',
    url: '/industryCategory/tree',
  }),

  // ############## 搜索職缺 ##############

  // 取得國家地區 flag = 0:國內 1:海外
  getArea: () => ({ method: 'GET', url: '/area/tree' }),

  // 取得職業領域
  getJobCat: () => ({ method: 'GET', url: '/job-cat/tree' }),

  // 熱門區域列表
  getAreaPopular: () => ({ method: 'GET', url: '/area/popular' }),

  // 熱門關鍵字
  getKeywords: () => ({ method: 'POST', url: '/keyword/popular' }),

  // 搜索職缺
  searchJobs: () => ({ method: 'POST', url: '/job-position/search' }),

  // 職缺詳細資訊
  getJob: ({ id }) => ({ method: 'GET', url: `/job-position/${id}` }),

  // 技能樹
  getListSkillTree: () => ({ method: 'GET', url: '/skill/tree' }),

  // 會員訪問被分享職缺
  accessShareJob: () => ({ method: 'POST', url: '/user/accessShareJob' }),

  // ############## 企業 ##############

  // 前10熱門企業列表
  getCompanyPopular: () => ({ method: 'GET', url: '/owner/popular' }),

  // 取得企業資訊
  getCompany: ({ oid }) => ({ method: 'GET', url: `/owner/${oid}` }),

  // ############## 文章 ##############

  // 依照文章分類取得文章
  getArticleCat: () => ({
    method: 'GET',
    url: '/article/getArticleByCategory',
  }),

  // 取得隨機文章
  getRandomArticle: () => ({
    method: 'GET',
    url: '/article/getRandomArticle',
  }),

  // 取得單筆文章資料
  getOneArticle: () => ({ method: 'GET', url: '/article/getOne' }),

  // 文章分頁查詢
  getArticleList: () => ({ method: 'POST', url: '/article/list' }),

  // ############## 會員中心 ##############

  // 會員中心-基本資料-取得基本資料
  userGetUser: () => ({ method: 'GET', url: '/user/getUser' }),

  // 會員中心-基本資料-修改基本資料
  userUpdateUser: () => ({ method: 'POST', url: '/user/updateUserInfo' }),

  // 會員中心-基本資料-取得家庭成員列表
  userGetFamilyList: () => ({ method: 'GET', url: '/userFamilyInfo/list' }),

  // 會員中心-基本資料-新增家庭成員
  userAddFamily: () => ({ method: 'POST', url: '/userFamilyInfo/add' }),

  // 會員中心-基本資料-修改家庭成員
  userUpdateFamily: () => ({ method: 'POST', url: '/userFamilyInfo/update' }),

  // 會員中心-基本資料-刪除家庭成員
  userDeleteFamily: () => ({ method: 'POST', url: '/userFamilyInfo/delete' }),

  // 會員中心-取得會員檔案
  // type: 0 = 履歷表, 1 = 面試紀錄, 2 = 離職證明
  getUserFiles: () => ({ method: 'GET', url: '/user/files' }),

  // 會員中心-上傳會員檔案
  uploadUserFile: () => ({
    method: 'FILE',
    url: '/user/uploadUserResumeFile',
  }),

  // 會員中心-移除會員檔案
  removeUserFile: () => ({ method: 'DELETE', url: '/user/files' }),

  // 會員中心-我的履歷-取得履歷資訊
  userGetUserResume: () => ({ method: 'GET', url: '/user/getUserResume' }),

  // 會員中心-我的履歷-修改履歷資訊
  userUpdateUserResume: () => ({
    method: 'POST',
    url: '/user/updateUserResume',
  }),

  // 會員中心-我的履歷-取得學歷列表
  userGetEducationList: () => ({ method: 'GET', url: '/userEducation/list' }),

  // 會員中心-基本資料-新增學歷
  userAddEducation: () => ({ method: 'POST', url: '/userEducation/add' }),

  // 會員中心-基本資料-修改學歷
  userUpdateEducation: () => ({
    method: 'POST',
    url: '/userEducation/update',
  }),

  // 會員中心-基本資料-刪除學歷
  userDeleteEducation: () => ({
    method: 'POST',
    url: '/userEducation/delete',
  }),

  // 會員中心-基本資料-Email認證
  sendEmailVerify: () => ({
    method: 'GET',
    url: '/user/sendEmailVerify',
  }),

  // 會員中心-我的履歷-取得工作經歷列表
  userGetExperienceList: () => ({
    method: 'GET',
    url: '/userExperience/list',
  }),

  // 會員中心-基本資料-新增工作經歷
  userAddExperience: () => ({ method: 'POST', url: '/userExperience/add' }),

  // 會員中心-基本資料-修改工作經歷
  userUpdateExperience: () => ({
    method: 'POST',
    url: '/userExperience/update',
  }),

  // 會員中心-基本資料-刪除工作經歷
  userDeleteExperience: () => ({
    method: 'POST',
    url: '/userExperience/delete',
  }),

  // 會員中心-我的履歷-取得會員技能列表
  userGetSkillList: () => ({ method: 'POST', url: '/userSkill/list' }),

  // 會員中心-基本資料-新增會員技能
  userAddSkill: () => ({ method: 'POST', url: '/userSkill/add' }),

  // 會員中心-基本資料-刪除會員技能
  userDeleteSkill: () => ({ method: 'POST', url: '/userSkill/delete' }),

  // 會員中心-我的履歷-取得語言列表
  userGetLanguageList: () => ({ method: 'GET', url: '/userLanguage/list' }),

  // 會員中心-基本資料-新增語言
  userAddLanguage: () => ({ method: 'POST', url: '/userLanguage/add' }),

  // 會員中心-基本資料-修改語言
  userUpdateLanguage: () => ({ method: 'POST', url: '/userLanguage/update' }),

  // 會員中心-基本資料-刪除語言
  userDeleteLanguage: () => ({ method: 'POST', url: '/userLanguage/delete' }),

  // 會員中心-應徵職缺
  userAddApplicant: () => ({ method: 'POST', url: '/userApplicant/add' }),

  // 會員中心-應徵記錄
  userGetApplicantList: () => ({ method: 'GET', url: '/userApplicant/list' }),

  // 會員中心-取消應徵記錄
  cancelUserApplicant: ({ id }) => ({
    method: 'PATCH',
    url: `/userApplicant/${id}/cancel`,
  }),

  // 會員中心-收藏記錄
  userGetFavoriteJobList: () => ({
    method: 'GET',
    url: '/user/favorite/job',
  }),

  // 會員中心-收藏記錄-新增
  userAddFavoriteJob: () => ({ method: 'POST', url: '/user/favorite/job' }),

  // 會員中心-收藏記錄-移除
  userRemoveFavoriteJob: () => ({
    method: 'DELETE',
    url: '/user/favorite/job',
  }),

  // 會員中心-推薦記錄
  userGetReferList: () => ({ method: 'GET', url: '/user/refer' }),

  // 會員中心-推薦-取得會員分享碼
  userGetReferCode: () => ({ method: 'GET', url: '/user/referCode' }),

  // 會員中心-提领記錄
  userGetWithdrawAmount: () => ({
    method: 'GET',
    url: '/userWithdrawInfo/getWithdrawAmount',
  }),

  // 會員中心-申請款項
  userAddWithdraw: () => ({
    method: 'POST',
    url: '/userWithdrawInfo/addWithdrawHistory',
  }),

  // 會員中心-取得提款資訊
  userGetWithdrawInfo: () => ({
    method: 'GET',
    url: '/userWithdrawInfo/getWithdrawInfo',
  }),

  // 會員中心-新增提款資訊
  userAddWithdrawInfo: () => ({
    method: 'POST',
    url: '/userWithdrawInfo/add',
  }),

  // 會員中心-提款紀錄
  userListWithdraw: () => ({
    method: 'POST',
    url: '/userWithdrawInfo/listAll',
  }),
};
