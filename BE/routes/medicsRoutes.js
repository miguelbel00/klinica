const express = require("express");
const router = express.Router();

const {
  createMedic,
  editMedic,
  deleteMedic,
  getMedic,
  changePasswordMedic,
  addMedicSpecialty,
  delMedicSpecialty
} = require("../controllers/Medic/index.js");

const {verifyJWT} = require('../middlewares/jwt.js')

router.post("/",createMedic)
router.post("/addspecialty",verifyJWT,addMedicSpecialty)
router.delete("/delspecialty",verifyJWT,delMedicSpecialty)
router.put("/",verifyJWT,editMedic);
router.put("/changepwd",changePasswordMedic);
router.delete("",verifyJWT,deleteMedic);
router.get("",verifyJWT,getMedic);

module.exports = router;
