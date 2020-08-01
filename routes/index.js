const express = require('express')

const router = express.Router()
const BoardHandler = require('./functions/Board/handler')
const UserHandler = require('./functions/User/handler')
const passport = require('../config/passport')
const BoardHelper = require('../Helper/BoardHelper');
const passport = require('../config/passport');
const StoreHelper = require('../Helper/StoreHelper');

// router.get('/users', passport.authenticate('jwt', {session: false}), UserController.index);
// router.post('/auth/tokens', UserHandler.CreateJWTToken);

// 새로운 사용자 생성
router.post('/admin/api/guest/customers.json', UserHandler.ClaimNewGuestUser)

// 생성된 사용자의 닉네임 등의 데이터 변경
router.put('/admin/api/edit/customers/:member_id.json', passport.authenticate('jwt', { session: false }), UserHandler.EditUserInfomation)

// 사용자 인증 처리
router.put('/auth/login', UserHandler.ClaimNewToken)

// 익명 사용자 로그아웃(탈퇴) 처리
router.delete('/admin/api/remove/guest/:member_id.json', passport.authenticate('jwt', { session: false }), UserHandler.RemoveGuestUser)

router.get('/hello', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  console.log(req.passport.member_id)
  res.send('HELLO!!')
})


router.get('/generate-user', UserHandler.CreatePhoneUser)
router.get('/generate-session', UserHandler.CreatePhoneSession)


// 게시판 관련
router.post('/api/board', BoardHelper.CreateBoard)

// 점포 관련
router.post('/api/store', StoreHelper.CreateStore);
router.post('/api/store/time', StoreHelper.CreateStoreOpeningTime);
router.post('/api/store/merchandise', StoreHelper.CreateStoreMerchandise);
router.post('/api/store/telephone', StoreHelper.CreateStoreTelePhone);
router.post('/api/store/:storeId/votegrade', StoreHelper.CreateVoteGrade);
router.put('/api/store/:storeId/votegrade', StoreHelper.UpdateVoteGrade);
router.post('/api/ordertype', StoreHelper.CreateOderType);
router.post('/api/store/:storeId/ordertype', StoreHelper.MappingOrderTypeToStore);

// 게시글 관련
router.get('/api/board/:category/content', BoardHelper.GetAllBoardContentOrderByMethod)
router.get('/api/board/:category/content/:documentId', BoardHelper.GetBoardContent)
router.post('/api/board/:category/content', BoardHelper.CreateBoardContent)
router.put('/api/board/:category/content/:documentId', BoardHelper.UpdateBoardContent)
router.delete('/api/board/:category/content/:documentId', BoardHelper.DeleteBoardContent)
router.patch('/api/board/:category/content/:documentId', BoardHelper.PatchBoardContentVoteOrBlame)

module.exports = router
