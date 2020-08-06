var express = require('express')
var router = express.Router()
const StoreHelper = require('../Helper/StoreHelper')
const StoreHandler = require('./functions/Store/handler.js')

// 점포 조회 관련
router.get('/', StoreHandler.ReadAllStoresOrderByGrade)
router.get('/type/:type/orderby/:orderby', StoreHandler.ReadStoresOrderByType)

// 점포 필수 정보 관련
router.post('/', StoreHandler.CreateStoreInformation)

// 점포 필수 정보 관련 - 연락처
router.post('/:storeId/telephone', StoreHandler.CreateStoreTelephone)

// 점포 필수 정보 관련 - 영업시간
router.post('/:storeId/time', StoreHandler.CreateOpeningTime)

// 점포 필수 정보 관련 - 거래방식
router.post('/ordertype', StoreHandler.CreateOrderType)

// 점포 좋아요/평점 관련
router.post('/:storeId/star', StoreHandler.RegisterStarredStore)
router.delete('/:storeId/star', StoreHandler.UnRegisterStarredStore)
router.post('/:storeId/votegrade', StoreHandler.CreateVoteGrade)
router.put('/:storeId/votegrade', StoreHandler.EditVoteGrade)
router.post('/:storeId/ordertype', StoreHandler.RegisterOrderTypeOnStore)



// 로직 정의 필요
router.post('/merchandise', StoreHelper.CreateStoreMerchandise)



module.exports = router
