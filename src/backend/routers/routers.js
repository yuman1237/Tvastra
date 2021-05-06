const express = require("express");
const router = express.Router();
const path = require("path");
const controller = require("../controllers/controllers");
const multer = require("multer");
router.get("/", controller.renderLoginPage);
router.get("/index", controller.renderIndexPage);
router.get("/doctor", controller.renderDoctorPage);
router.get("/hospital", controller.renderHospitalPage);
router.get("/aboutus", controller.renderAboutusPage);
router.get("/bookappointment", controller.renderBookAppointmentPage);
router.get("/contactus", controller.renderContactUsPage);
router.get("/otp", controller.renderOtpPage);
router.get("/phone-login", controller.renderPhoneLoginPage);
router.get("/create-password", controller.renderCreatePasswordPage);
router.get("/dentistry", controller.renderDentistryPage);
router.get("/doctor-profile", controller.renderDoctorProfilePage);
router.get("/faq", controller.renderFaqPage);
router.get("/hospital-profile", controller.renderHospitalProfilePage);
router.get("/signup", controller.renderSignUpPage);
router.get("/sumit", controller.renderSumitPage);
router.get("/tavastraplus", controller.renderTvastraPlustPage);
router.get("/doctor_form", controller.renderDoctorFormPage);
router.get("/profile", controller.renderProfilePage);
router.get("/appointments", controller.renderAppointmentPage);
router.get("/schedules", controller.renderSchedulesPage);
router.get("/medicalreports", controller.renderMedicalReportsPage);
router.get("/deleteSchedule", controller.DeleteSchedule);
router.get("/deleteSchedule", controller.DeleteSchedule);
router.get("/disableSlot", controller.DisableSlot);
router.get("/disableSchedule", controller.DisableSchedule);
router.get("/fetchtimeslots", controller.fetchtimeslots);
router.get("/booking", controller.booking);
router.get("/confirmbooking", controller.confirmbooking);
router.get("/deleteBooking", controller.deleteBooking);
router.get("/fetchappointments", controller.fetchappointments);
router.get("/Admin_Dashboard", controller.renderAdmindashboard);
router.get("/Admin_User", controller.renderAdminUser);
router.get("/Admin_hospital", controller.renderAdminhospital);
router.get("/Admin_Doctor", controller.renderAdminDoctor);
router.get("/showRecord", controller.rendershowRecord);
router.get("/deleteRecord", controller.postdeleteRecord);
router.get("/deleterecordfile", controller.deleterecordfile);
router.get("/settings", controller.settings);
router.get("/adminEditProfile", controller.adminEditProfile);
router.get("/adminUserAllAppointments", controller.adminUserAllAppointments);
router.get("/adminMedicalReports", controller.adminMedicalReports);
router.get("/adminshowRecord", controller.adminshowRecord);
router.get(
  "/adminUserAllAppointments_patient",
  controller.adminUserAllAppointments_patient
);
router.get("/admin_settings", controller.admin_settings);

// Not Valid
router.post("/not-valid", controller.postNotValid);
// Creating User Database
var Storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: Storage,
}).single("myfile");

router.post("/booking", controller.Postbooking);
router.post("/doctor_form", upload, controller.postDoctorFormPage);
router.post("/profile", upload, controller.postProfilePage);
router.post("/createschedules", controller.postCreateSchedules);
router.post("/signup", controller.postSignUp);
router.post("/logout", controller.postLogOut);
router.post("/addRecord", upload, controller.addRecord);
router.post("/addReportPic", upload, controller.addReportPic);
router.post("/settings", controller.postsettings);
router.post("/adminEditProfile", upload, controller.postadminEditProfile);

// login User
router.post("/login", controller.postLogin);
// Forgot Password
router.post("/reset-password", controller.postResetPassword);
router.post("/create-password", controller.postCreatePassword);

// creating OTP verfication
router.post("/otp/:token", controller.postOtpToken);
router.post("/otp", controller.postOtp);
router.get("/otp/:token/:code", controller.verifyOtp);

module.exports = router;
