const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../Middleware/AuthMiddlware");

const { createSection, getAllSections,deleteSection,getSectionWithSubSections } = require("../Controller/Section");
const { createSubsection,deleteSubSection,getSubSectionsWithCat} = require("../Controller/SubSection");
const { createCategory, getAllCategories,deleteCategory,getCatWithproduct } = require("../Controller/Category");
const { createProduct, getAllProducts ,deleteProduct} = require("../Controller/Product");


router.get("/getAllSections", getAllSections);
router.get("/getAllCategories", getAllCategories);
router.get("/getAllProducts", getAllProducts);

router.get("/getSectionWithSubSections", getSectionWithSubSections);
router.get("/getSubSectionsWithCat", getSubSectionsWithCat);
router.get("/getCatWithproduct", getCatWithproduct);

router.post("/section",authenticateUser,authorizeRoles("shopkeeper"), createSection);
router.post("/category",authenticateUser, authorizeRoles("shopkeeper"),createCategory);
router.post("/product",authenticateUser,authorizeRoles("shopkeeper"), createProduct);
router.post("/subSection",authenticateUser, authorizeRoles("shopkeeper"),createSubsection);

router.delete("/deleteSubSection",authenticateUser,authorizeRoles("shopkeeper"),deleteSubSection);
router.delete("/deleteCategory",authenticateUser,authorizeRoles("shopkeeper"),deleteCategory);
router.delete("/deleteSection",authenticateUser,authorizeRoles("shopkeeper"),deleteSection);
router.delete("/deleteProduct",authenticateUser,authorizeRoles("shopkeeper"),deleteProduct);


module.exports = router;
