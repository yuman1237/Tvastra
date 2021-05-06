const Signup = require("../models/signup");
const Doctorinfo = require("../models/doctor");
const Timeslot = require("../models/timeslots");
const Booking = require("../models/booking");
const Record = require("../models/addrecord");
const OtpManager = require("../../OtpManager");
const otpRepository = require("../../otpRepository");
const otpSender = require("../../otpSender");
const otpManager = new OtpManager(otpRepository, {
  otpLength: 4,
  validityTime: 1,
});
const moment = require("moment");

const mongoose = require("mongoose");
const e = require("express");
ObjectId = mongoose.Types.ObjectId;

exports.postLogOut = (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
exports.renderLoginPage = (req, res) => {
  res.render("login", {
    message2: req.flash("message2"),
    messagefail: req.flash("messagefail"),
    message7: req.flash("message7"),
    message8: req.flash("message8"),
    message1: req.flash("message1"),
  });
};
exports.renderIndexPage = async (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      await Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("index", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
          message1: req.flash("message1"),
          message: req.flash("message"),
        });
      });
    } else {
      await Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("index", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
          message1: req.flash("message1"),
          message: req.flash("message"),
        });
      });
    }
  }
};
exports.renderHospitalPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");
        //  console.log(doctor_123);
        res.render("hospital", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        //console.log(User_name);
        res.render("hospital", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("hospital", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderDoctorPage = async (req, res) => {
  let { page, size } = req.query;

  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 3;
  }

  const limit = parseInt(size);
  const skip = (page - 1) * size;
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      await Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        Doctorinfo.find({}, {}, { limit: limit, skip: skip }).then(
          (doctors) => {
            const username = req.session.doctor_hai;
            const user_ka = username.split(" ");

            res.render("doctor", {
              name: user_ka[0],
              fullname: req.session.username,
              pnumber: req.session.phone,
              myfile: doctor_123.myfile,
              doctorinfo: doctors,
              page: page,
            });
          }
        );
      });
    } else {
      await Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        Doctorinfo.find({}, {}, { limit: limit, skip: skip }).then(
          (doctors) => {
            res.render("doctor", {
              name: user_ka[0],
              fullname: req.session.username,
              pnumber: req.session.phone,
              myfile: User_name.myfile,
              doctorinfo: doctors,
              page: page,
            });
          }
        );
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.find({}, (err, doctors) => {
  //     Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //       const username = req.session.username;
  //       const user_ka = username.split(" ");
  //       res.render("doctor", {
  //         name: user_ka[0],
  //         fullname: req.session.username,
  //         pnumber: req.session.phone,
  //         myfile: user.myfile,
  //         doctorinfo: doctors,
  //       });
  //     });
  //   });
  // }
};
exports.renderAboutusPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");
        // console.log(doctor_123);
        res.render("aboutus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        // console.log(User_name);
        res.render("aboutus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   const username = req.session.username;
  //   const user_ka = username.split(" ");
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     res.render("aboutus", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderBookAppointmentPage = (req, res) => {
  if (req.session.loggedin === true) {
    res.render("bookappointment", {
      name: req.session.username,
    });
  }
};
exports.renderContactUsPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");
        // console.log(doctor_123);
        res.render("contactus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        //console.log(User_name);
        res.render("contactus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("contactus", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderOtpPage = (req, res) => {
  if (req.session.number) {
    res.render("otp", {
      number: req.session.number,
      messageInfo: req.flash("messageInfo"),
      message4: req.flash("message4"),
      message5: req.flash("message5"),
      messagefail: req.flash("messagefail"),
    });
  }
};
exports.renderPhoneLoginPage = (req, res) => {
  res.render("phone-login", {
    messagefail: req.flash("messagefail"),
    message3: req.flash("message3"),
  });
};
exports.renderCreatePasswordPage = (req, res) => {
  res.render("create-password", {
    messagefail: req.flash("messagefail"),
    message6: req.flash("message6"),
  });
};

exports.renderDentistryPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");
        // console.log(doctor_123);
        res.render("dentistry", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        //console.log(User_name);
        res.render("dentistry", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("dentistry", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderDoctorProfilePage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        Signup.findOne(
          { name: req.query.doctor, city: req.query.city },
          { myfile: 1, name: 1, doctor_hai: 1 }
        )
          .then((doc) => {
            if (doc.doctor_hai == "on") {
              res.render("doctor-profile", {
                name: user_ka[0],
                fullname: req.session.username,
                pnumber: req.session.phone,
                myfile: doctor_123.myfile,
                doc: doc,
              });
            } else {
              res.redirect("/index");
            }
          })
          .catch(() => {
            res.redirect("/index");
          });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        Signup.findOne(
          { name: req.query.doctor, city: req.query.city },
          { myfile: 1, name: 1, doctor_hai: 1 }
        )
          .then((doc) => {
            if (doc.doctor_hai == "on") {
              res.render("doctor-profile", {
                name: user_ka[0],
                fullname: req.session.username,
                pnumber: req.session.phone,
                myfile: User_name.myfile,
                doc: doc,
              });
            } else {
              res.redirect("/index");
            }
          })
          .catch(() => {
            res.redirect("/index");
          });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("doctor-profile", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderFaqPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("faq", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("faq", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("faq", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};

exports.renderHospitalProfilePage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("hospital-profile", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("hospital-profile", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("hospital-profile", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};

exports.renderSignUpPage = (req, res) => {
  res.render("signup");
};

exports.renderSumitPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("sumit", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("sumit", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
};

exports.renderTvastraPlustPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("tavastraplus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("tavastraplus", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Doctorinfo.findOne({ doctorname: req.session.username }).then((user) => {
  //     const username = req.session.username;
  //     const user_ka = username.split(" ");
  //     res.render("tavastraplus", {
  //       name: user_ka[0],
  //       fullname: req.session.username,
  //       pnumber: req.session.phone,
  //       myfile: user.myfile,
  //     });
  //   });
  // }
};
exports.renderProfilePage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Signup.findOne({ name: req.session.doctor_hai }).then((user) => {
        Doctorinfo.findOne({ doctorname: req.session.doctor_hai }).then(
          (doc) => {
            const username = req.session.doctor_hai;
            const user_ka = username.split(" ");
            //  console.log(doc);
            res.render("profile", {
              name: user_ka[0],
              fullname: req.session.username,
              pnumber: req.session.phone,
              myfile: doc.myfile,
              user: user,
              doc: doc,
            });
          }
        );
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        // console.log(User_name);
        res.render("profile", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
          user: User_name,
        });
      });
    }
  }
  // if (req.session.loggedin === true) {
  //   Signup.findOne({ name: req.session.username }).then((user) => {
  //     Doctorinfo.findOne({ doctorname: req.session.username }).then((doc) => {
  //       const username = req.session.username;
  //       const user_ka = username.split(" ");
  //       res.render("profile", {
  //         name: user_ka[0],
  //         fullname: req.session.username,
  //         pnumber: req.session.phone,
  //         myfile: doc.myfile,
  //         user: user,
  //         doc: doc,
  //       });
  //     });
  //   });
  // }
};
exports.renderDoctorFormPage = (req, res) => {
  res.render("doctorForm");
};
exports.postProfilePage = async (req, res) => {
  if (req.session.doctor_hai) {
    if (req.file) {
      let hospitals = JSON.parse(req.body.hospitals)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let achievement = JSON.parse(req.body.achievement)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let qualification = JSON.parse(req.body.qualification)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let awards = JSON.parse(req.body.awards)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let spcialization = JSON.parse(req.body.spcialization)
        .map((item) => {
          return item["value"];
        })
        .toString();

      try {
        await Signup.updateOne(
          { name: req.session.doctor_hai },
          {
            $set: {
              name: req.body.name,
              pnumber: req.body.pnumber,
              email: req.body.email,
              gender: req.body.gender,
              date: req.body.date,
              timezone: req.body.timezone,
              homeno: req.body.homeno,
              street: req.body.street,
              state: req.body.state,
              country: req.body.country,
              myfile: req.file.filename,
            },
          }
        ).then(async () => {
          await Doctorinfo.updateOne(
            { doctorname: req.session.doctor_hai },
            {
              $set: {
                doctorname: req.body.name,
                describe: req.body.describe,
                experience: req.body.experience,
                avgfees: req.body.avgfees,
                myfile: req.file.filename,
                hospitals: hospitals,
                achievement: achievement,
                qualification: qualification,
                awards: awards,
                spcialization: spcialization,
              },
            }
          ).then(() => {
            res.redirect("/profile");
          });
        });
      } catch {}
    } else {
      let hospitals = JSON.parse(req.body.hospitals)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let achievement = JSON.parse(req.body.achievement)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let qualification = JSON.parse(req.body.qualification)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let awards = JSON.parse(req.body.awards)
        .map((item) => {
          return item["value"];
        })
        .toString();
      let spcialization = JSON.parse(req.body.spcialization)
        .map((item) => {
          return item["value"];
        })
        .toString();

      try {
        await Signup.updateOne(
          { name: req.session.doctor_hai },
          {
            $set: {
              name: req.body.name,
              pnumber: req.body.pnumber,
              email: req.body.email,
              gender: req.body.gender,
              date: req.body.date,
              timezone: req.body.timezone,
              homeno: req.body.homeno,
              street: req.body.street,
              state: req.body.state,
              country: req.body.country,
            },
          }
        ).then(async () => {
          await Doctorinfo.updateOne(
            { doctorname: req.session.doctor_hai },
            {
              $set: {
                doctorname: req.body.name,
                describe: req.body.describe,
                experience: req.body.experience,
                avgfees: req.body.avgfees,
                hospitals: hospitals,
                achievement: achievement,
                qualification: qualification,
                awards: awards,
                spcialization: spcialization,
              },
            }
          ).then(() => {
            res.redirect("/profile");
          });
        });
      } catch {}
    }
  } else {
    if (req.file) {
      await Signup.updateOne(
        { name: req.session.username },
        {
          $set: {
            name: req.body.name,
            pnumber: req.body.pnumber,
            email: req.body.email,
            gender: req.body.gender,
            date: req.body.date,
            timezone: req.body.timezone,
            homeno: req.body.homeno,
            street: req.body.street,
            state: req.body.state,
            country: req.body.country,
            myfile: req.file.filename,
          },
        }
      ).then(() => {
        res.redirect("/profile");
      });
    } else {
      await Signup.updateOne(
        { name: req.session.username },
        {
          $set: {
            name: req.body.name,
            pnumber: req.body.pnumber,
            email: req.body.email,
            gender: req.body.gender,
            date: req.body.date,
            timezone: req.body.timezone,
            homeno: req.body.homeno,
            street: req.body.street,
            state: req.body.state,
            country: req.body.country,
          },
        }
      ).then(() => {
        res.redirect("/profile");
      });
    }
  }
};

exports.renderAppointmentPage = async (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then((doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");

        res.render("appointments", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: doctor_123.myfile,
          doctor: req.session.doctor_hai,
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then((User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");

        res.render("appointments", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: User_name.myfile,
        });
      });
    }
  }
};
exports.renderSchedulesPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Timeslot.find({ doctorname: req.session.doctor_hai })
        .populate("timeslot_arr")
        .exec()
        .then((user) => {
          Doctorinfo.findOne({ doctorname: req.session.doctor_hai }).then(
            (user1) => {
              const username = req.session.doctor_hai;
              const user_ka = username.split(" ");
              res.render("schedules", {
                user: user,
                name: user_ka[0],
                fullname: req.session.username,
                pnumber: req.session.phone,
                myfile: user1.myfile,
              });
            }
          );
        });
    }
  }
};
exports.renderMedicalReportsPage = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({ doctorname: req.session.doctor_hai }).then(
        (user) => {
          Record.find(
            { doctorname: req.session.doctor_hai },
            { _id: 1, date: 1, title: 1, name: 1, reportType: 1 }
          ).then((rec) => {
            const username = req.session.doctor_hai;
            const user_ka = username.split(" ");
            const rec1 = rec.map((e) => {
              let x = moment(e.date).format("MMM D");
              let p = {
                _id: e._id,
                date: x,
                title: e.title.toUpperCase(),
                name: e.name,
                reportType: e.reportType,
                doctor: req.session.doctor_hai,
              };
              return p;
            });

            res.render("medicalreports", {
              name: user_ka[0],
              fullname: req.session.username,
              pnumber: req.session.phone,
              myfile: user.myfile,
              rec: rec1,
              doctor: req.session.doctor_hai,
            });
          });
        }
      );
    } else {
      Signup.findOne({ name: req.session.username }).then((user) => {
        Record.find(
          { name: req.session.username },
          { _id: 1, date: 1, title: 1, name: 1, reportType: 1 }
        ).then((rec) => {
          const username = req.session.username;
          const user_ka = username.split(" ");
          const rec1 = rec.map((e) => {
            let x = moment(e.date).format("MMM D");
            let p = {
              _id: e._id,
              date: x,
              title: e.title.toUpperCase(),
              name: e.name,
              reportType: e.reportType,
            };
            return p;
          });
          res.render("medicalreports", {
            name: user_ka[0],
            fullname: req.session.username,
            pnumber: req.session.phone,
            myfile: user.myfile,
            rec: rec1,
          });
        });
      });
    }
  }
};
exports.settings = (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({ doctorname: req.session.doctor_hai }).then(
        (user) => {
          const username = req.session.username;
          const user_ka = username.split(" ");
          res.render("settings", {
            name: user_ka[0],
            fullname: req.session.username,
            pnumber: req.session.phone,
            myfile: user.myfile,
            doctor: req.session.doctor_hai,
          });
        }
      );
    } else {
      Signup.findOne({ name: req.session.username }).then((user) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        res.render("settings", {
          name: user_ka[0],
          fullname: req.session.username,
          pnumber: req.session.phone,
          myfile: user.myfile,
        });
      });
    }
  }
};
exports.renderAdmindashboard = (req, res) => {
  if (req.session.loggedin_admin === true) {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 3;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    Booking.find(
      {},
      { patient: 1, mobile_number: 1, patient_email: 1, _id: 1 },

      { limit: limit, skip: skip }
    ).then((user) => {
      res.render("Admin_Dashboard", {
        user: user,
        page: page,
      });
    });
  }
};
exports.renderAdminUser = (req, res) => {
  if (req.session.loggedin_admin === true) {
    Signup.find(
      { doctor_hai: "off" },
      {
        myfile: 1,
        email: 1,
        name: 1,
        pnumber: 1,
        gender: 1,
        city: 1,
        state: 1,
        _id: 1,
      }
    ).then((user) => {
      res.render("Admin_User", {
        user: user,
      });
    });
  }
};
exports.adminUserAllAppointments_patient = async (req, res) => {
  if (req.session.loggedin_admin === true) {
    await Booking.findOne(
      { _id: req.query.id },
      { doctor: 1, hospital: 1, from: 1, date: 1 }
    ).then((user) => {
      let pending = {};
      let complete = {};

      let { doctor, hospital, from, date } = user;
      let day1 = moment().subtract(1, "days");
      if (day1.isAfter(moment(date))) {
        let x = {
          doctor: doctor,
          hospital: hospital,
          from: from,
          date: moment(date).format("MMM D"),
          day: moment(date).format("ddd"),
        };
        complete = x;
      } else {
        let x = {
          doctor: doctor,
          hospital: hospital,
          from: from,
          date: moment(date).format("MMM D"),
          day: moment(date).format("ddd"),
        };
        pending = x;
      }
      //console.log(pending);
      //console.log(complete);
      if (pending.date) {
        res.render("adminUserAllAppointments_patient", {
          pending: pending,
        });
      } else {
        res.render("adminUserAllAppointments_patient", {
          complete: complete,
        });
      }
    });
  }
};
exports.adminUserAllAppointments = async (req, res) => {
  if (req.session.loggedin_admin === true) {
    await Signup.findOne({ _id: req.query.id }).then(async (sign) => {
      if (sign.doctor_hai == "on") {
        await Booking.find(
          { doctor: sign.name },
          { patient: 1, hospital: 1, from: 1, date: 1 }
        ).then((user) => {
          let pending = [];
          let complete = [];
          user.forEach((e) => {
            let day1 = moment().subtract(1, "days");
            if (day1.isAfter(moment(e.date))) {
              let x = {
                patient: e.patient,
                hospital: e.hospital,
                from: e.from,
                date: moment(e.date).format("MMM D"),
                day: moment(e.date).format("ddd"),
              };
              complete.push(x);
            } else {
              let x = {
                patient: e.patient,
                hospital: e.hospital,
                from: e.from,
                date: moment(e.date).format("MMM D"),
                day: moment(e.date).format("ddd"),
              };
              pending.push(x);
            }
          });
          res.render("adminUserAllAppointments", {
            pending: pending,
            complete: complete,
          });
        });
      } else {
        await Booking.find(
          { user_id: req.query.id },
          { doctor: 1, hospital: 1, from: 1, date: 1 }
        ).then((user) => {
          // console.log(user);
          let pending = [];
          let complete = [];
          user.forEach((e) => {
            let day1 = moment().subtract(1, "days");
            if (day1.isAfter(moment(e.date))) {
              let x = {
                doctor: e.doctor,
                hospital: e.hospital,
                from: e.from,
                date: moment(e.date).format("MMM D"),
                day: moment(e.date).format("ddd"),
              };
              complete.push(x);
            } else {
              let x = {
                doctor: e.doctor,
                hospital: e.hospital,
                from: e.from,
                date: moment(e.date).format("MMM D"),
                day: moment(e.date).format("ddd"),
              };
              pending.push(x);
            }
          });
          res.render("adminUserAllAppointments", {
            pending: pending,
            complete: complete,
          });
        });
      }
    });
  }
};

exports.adminMedicalReports = (req, res) => {
  if (req.session.loggedin_admin === true) {
    Signup.findOne({ _id: req.query.id }).then((sign) => {
      if (sign.doctor_hai == "on") {
        Record.find(
          { doctorname: sign.name },
          { _id: 1, date: 1, title: 1, name: 1, reportType: 1 }
        ).then((el) => {
          const rec1 = el.map((e) => {
            let x = moment(e.date).format("MMM D");
            let p = {
              _id: e._id,
              date: x,
              title: e.title.toUpperCase(),
              name: e.name,
              reportType: e.reportType,
            };
            return p;
          });
          res.render("adminMedicalReports", {
            rec: rec1,
            us: req.query.id,
          });
        });
      } else {
        Record.find(
          { name: sign.name },
          { _id: 1, date: 1, title: 1, name: 1, reportType: 1 }
        ).then((el) => {
          const rec1 = el.map((e) => {
            let x = moment(e.date).format("MMM D");
            let p = {
              _id: e._id,
              date: x,
              title: e.title.toUpperCase(),
              name: e.name,
              reportType: e.reportType,
              user_id: req.query.id,
            };
            return p;
          });

          res.render("adminMedicalReports", {
            rec: rec1,
          });
        });
      }
    });
  }
};
exports.adminEditProfile = (req, res) => {
  if (req.session.loggedin_admin === true) {
    const id = req.query.id;
    Signup.findOne({ _id: id }).then((user) => {
      if (user.doctor_hai == "on") {
        Doctorinfo.findOne({ doctorname: user.name }).then((doc) => {
          res.render("adminEditProfile", {
            user: user,
            doc: doc,
          });
        });
      } else {
        res.render("adminEditProfile", {
          user: user,
        });
      }
    });
  }
};
exports.postadminEditProfile = async (req, res) => {
  const user_id = req.query.id;
  if (req.file) {
    await Signup.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          name: req.body.name,
          pnumber: req.body.pnumber,
          email: req.body.email,
          gender: req.body.gender,
          date: req.body.date,
          timezone: req.body.timezone,
          homeno: req.body.homeno,
          street: req.body.street,
          state: req.body.state,
          country: req.body.country,
          myfile: req.file.filename,
        },
      }
    ).then(async () => {
      await Signup.findOne({ _id: user_id }).then(async (use) => {
        if (use.doctor_hai == "on") {
          let hospitals = JSON.parse(req.body.hospitals)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let achievement = JSON.parse(req.body.achievement)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let qualification = JSON.parse(req.body.qualification)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let awards = JSON.parse(req.body.awards)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let spcialization = JSON.parse(req.body.spcialization)
            .map((item) => {
              return item["value"];
            })
            .toString();

          await Doctorinfo.findOneAndUpdate(
            { doctorname: use.name },
            {
              $set: {
                doctorname: req.body.name,
                describe: req.body.describe,
                experience: req.body.experience,
                avgfees: req.body.avgfees,
                myfile: req.file.filename,
                hospitals: hospitals,
                achievement: achievement,
                qualification: qualification,
                awards: awards,
                spcialization: spcialization,
              },
            }
          ).then(() => {
            res.redirect(`/adminEditProfile?id=${user_id}`);
          });
        } else {
          res.redirect(`/adminEditProfile?id=${user_id}`);
        }
      });
    });
  } else {
    await Signup.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          name: req.body.name,
          pnumber: req.body.pnumber,
          email: req.body.email,
          gender: req.body.gender,
          date: req.body.date,
          timezone: req.body.timezone,
          homeno: req.body.homeno,
          street: req.body.street,
          state: req.body.state,
          country: req.body.country,
        },
      }
    ).then(async () => {
      await Signup.findOne({ _id: user_id }).then(async (use) => {
        if (use.doctor_hai == "on") {
          let hospitals = JSON.parse(req.body.hospitals)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let achievement = JSON.parse(req.body.achievement)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let qualification = JSON.parse(req.body.qualification)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let awards = JSON.parse(req.body.awards)
            .map((item) => {
              return item["value"];
            })
            .toString();
          let spcialization = JSON.parse(req.body.spcialization)
            .map((item) => {
              return item["value"];
            })
            .toString();

          await Doctorinfo.findOneAndUpdate(
            { doctorname: use.name },
            {
              $set: {
                doctorname: req.body.name,
                describe: req.body.describe,
                experience: req.body.experience,
                avgfees: req.body.avgfees,

                hospitals: hospitals,
                achievement: achievement,
                qualification: qualification,
                awards: awards,
                spcialization: spcialization,
              },
            }
          ).then(() => {
            res.redirect(`/adminEditProfile?id=${user_id}`);
          });
        } else {
          res.redirect(`/adminEditProfile?id=${user_id}`);
        }
      });
    });
  }
};
exports.renderAdminDoctor = (req, res) => {
  if (req.session.loggedin_admin === true) {
    Signup.find(
      { doctor_hai: "on" },
      {
        myfile: 1,
        email: 1,
        name: 1,
        pnumber: 1,
        gender: 1,
        city: 1,
        state: 1,
        _id: 1,
      }
    ).then((user) => {
      res.render("Admin_Doctor", {
        user: user,
      });
    });
  }
};
exports.renderAdminhospital = (req, res) => {
  if (req.session.loggedin_admin === true) {
    res.render("Admin_hospital");
  }
};
exports.admin_settings = (req, res) => {
  if (req.session.loggedin_admin === true) {
    res.render("admin_settings");
  }
};
exports.adminshowRecord = async (req, res) => {
  if (req.session.loggedin_admin === true) {
    await Record.findOne({ _id: req.query.id }, { myfile: 1, title: 1 }).then(
      (user) => {
        res.render("adminshowRecord", {
          user: user,
        });
      }
    );
  }
};
exports.booking = (req, res) => {
  if (req.session.loggedin === true) {
    Timeslot.find({ _id: req.query.dayslot }).then((user) => {
      const interval = parseInt(user[0].interval);

      const to = moment(req.query.time, "hh:mm A").add(interval, "minutes");
      if (req.session.doctor_hai) {
        Doctorinfo.findOne({
          doctorname: req.session.doctor_hai,
        }).then((doctor_123) => {
          Doctorinfo.findOne({ doctorname: req.query.doctorname }).then(
            (doc) => {
              const username = req.session.doctor_hai;
              const user_ka = username.split(" ");
              res.render("booking", {
                from: req.query.time,
                date: req.query.date,
                to: to.format("hh:mm A"),
                pic: doc.myfile,
                docname: req.query.doctorname,
                hospital: doc.hospitals,
                name: user_ka[0],
                fullname: req.session.doctor_hai,
                pnumber: req.session.phone,
                myfile: doctor_123.myfile,
              });
            }
          );
        });
      } else {
        Signup.findOne({ name: req.session.username }).then((User_name) => {
          const username = req.session.username;
          const user_ka = username.split(" ");
          Doctorinfo.findOne({ doctorname: req.query.doctorname }).then(
            (doc) => {
              res.render("booking", {
                user_id: User_name._id,
                from: req.query.time,
                date: req.query.date,
                to: to.format("hh:mm A"),
                pic: doc.myfile,
                docname: req.query.doctorname,
                hospital: doc.hospitals,
                name: user_ka[0],
                fullname: req.session.username,
                pnumber: req.session.phone,
                myfile: User_name.myfile,
              });
            }
          );
        });
      }
    });
  }
};
exports.rendershowRecord = async (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      Doctorinfo.findOne({
        doctorname: req.session.doctor_hai,
      }).then(async (doctor_123) => {
        const username = req.session.doctor_hai;
        const user_ka = username.split(" ");
        await Record.findOne(
          { _id: req.query.id },
          { myfile: 1, title: 1, doctorname: 1 }
        ).then((user) => {
          res.render("showRecord", {
            name: user_ka[0],
            fullname: req.session.doctor_hai,
            pnumber: req.session.phone,
            myfile: doctor_123.myfile,
            user: user,
            id: req.query.id,
            doctor: req.session.doctor_hai,
          });
        });
      });
    } else {
      Signup.findOne({ name: req.session.username }).then(async (User_name) => {
        const username = req.session.username;
        const user_ka = username.split(" ");
        await Record.findOne(
          { _id: req.query.id },
          { myfile: 1, title: 1 }
        ).then((user) => {
          res.render("showRecord", {
            name: user_ka[0],
            fullname: req.session.username,
            pnumber: req.session.phone,
            myfile: User_name.myfile,
            user: user,
          });
        });
      });
    }
  }
};
exports.addReportPic = async (req, res) => {
  let file = req.file.filename.toString();
  let r = {
    file: file,
  };

  await Record.updateOne(
    { _id: req.body.reportId },
    { $push: { myfile: r } }
  ).then(() => {
    res.status(200).redirect(`/showRecord?id=${req.body.reportId}`);
  });
};
exports.postsettings = async (req, res) => {
  await Signup.findOne({ name: req.session.username }).then(async (u) => {
    if (u.password == req.body.password) {
      if (req.body.new_password == req.body.confirm_password) {
        await Signup.updateOne(
          { name: req.session.username },
          {
            $set: {
              password: req.body.new_password,
            },
          }
        ).then(() => {
          res.status(200).redirect("/profile");
        });
      }
    }
  });
};
exports.deleterecordfile = async (req, res) => {
  // await Record.findOneAndDelete({
  //   _id: req.query.id,
  //   "myfile._id": req.query.file_id,
  // }).then(() => {
  //   res.status(200).redirect(`/showRecord?id=${req.query.id}`);
  // });
  await Record.updateOne(
    { _id: req.query.id },
    { $pull: { myfile: { _id: req.query.file_id } } }
  ).then(() => {
    res.status(200).redirect(`/showRecord?id=${req.query.id}`);
  });
};
exports.postdeleteRecord = async (req, res) => {
  await Record.findOneAndDelete({ _id: req.query.id }).then(() => {
    if (req.session.loggedin === true) {
      res.redirect("/medicalreports");
    } else {
      res.redirect(`/adminMedicalReports?id=${req.query.user_id}`);
    }
  });
};

exports.confirmbooking = async (req, res) => {
  if (req.session.loggedin === true) {
    Doctorinfo.findOne({ doctorname: req.session.book.doctor }).then((u) => {
      if (req.session.doctor_hai) {
        Doctorinfo.findOne({ doctorname: req.session.doctor_hai }).then(
          (user) => {
            const username = req.session.doctor_hai;
            const user_ka = username.split(" ");
            res.render("confirmbooking", {
              user: req.session.book,
              pic: u.myfile,
              name: user_ka[0],
              fullname: req.session.doctor_hai,
              pnumber: req.session.phone,
              myfile: user.myfile,
            });
          }
        );
      } else {
        Signup.findOne({ name: req.session.username }).then((user) => {
          const username = req.session.username;
          const user_ka = username.split(" ");
          res.render("confirmbooking", {
            user: req.session.book,
            pic: u.myfile,
            name: user_ka[0],
            fullname: req.session.username,
            pnumber: req.session.phone,
            myfile: user.myfile,
          });
        });
      }
    });
  }
};

exports.deleteBooking = async (req, res) => {
  Booking.findOneAndDelete({ _id: req.query.id }).then((u) => {
    // console.log(u);
    res.status(200).redirect("/index");
  });
};
exports.Postbooking = async (req, res) => {
  //console.log(req.body);
  //console.log(req.query);
  const booking = new Booking({
    user_id: req.query.user_id,
    patient: req.body.patient,
    mobile_number: req.body.mobile_number,
    patient_email: req.body.patient_email,
    doctor: req.query.doctor,
    hospital: req.query.hospital,
    from: req.query.from,
    to: req.query.to,
    date: req.query.date,
  });
  const book = await booking.save();
  req.session.book = book;
  res.status(200).redirect("/confirmbooking");
};
exports.fetchtimeslots = async (req, res) => {
  await Timeslot.find(
    { doctorname: req.query.doctorname, switch: "off" },
    { day: 1, timeslot_arr: 1 }
  ).exec((err, user) => {
    res.status(200).send(user);
  });
};
exports.DeleteSchedule = async (req, res) => {
  await Timeslot.findOneAndDelete({ _id: req.query.id }, (err, data) => {
    if (!err) {
      res.redirect("/schedules");
    }
  });
};
exports.DisableSchedule = async (req, res) => {
  await Timeslot.findOne({ _id: req.query.id }).then(async (user) => {
    if (user.switch == "off") {
      await Timeslot.updateOne(
        { _id: req.query.id },
        {
          $set: {
            switch: "on",
          },
        }
      ).then(async () => {
        await Timeslot.findOne({ _id: req.query.id }, { switch: 1 }).then(
          (el) => {
            res.status(200).send(el);
          }
        );
      });
    } else {
      await Timeslot.updateOne(
        { _id: req.query.id },
        {
          $set: {
            switch: "off",
          },
        }
      ).then(async () => {
        await Timeslot.findOne({ _id: req.query.id }, { switch: 1 }).then(
          (el) => {
            res.status(200).send(el);
          }
        );
      });
    }
  });
};

exports.fetchappointments = async (req, res) => {
  if (req.session.loggedin === true) {
    if (req.session.doctor_hai) {
      await Booking.find(
        { doctor: req.session.doctor_hai },
        { patient: 1, hospital: 1, from: 1, date: 1 }
      ).then((user) => {
        res.status(200).send(user);
      });
    } else {
      const username = req.session.username;
      const user_ka = username.split(" ");
      Signup.findOne({ name: req.session.username }).then(async (u) => {
        await Booking.find(
          { user_id: u._id },
          { doctor: 1, hospital: 1, from: 1, date: 1 }
        ).then((user) => {
          res.status(200).send(user);
        });
      });
    }
  }
};

exports.DisableSlot = async (req, res) => {
  await Timeslot.findOne(
    {
      _id: req.query.scheduleId,
      "timeslot_arr._id": req.query.slotId,
    },
    { "timeslot_arr.$": 1 }
  ).then(async (user) => {
    if (user.timeslot_arr[0]["timeOn"] == "on") {
      await Timeslot.updateOne(
        { _id: req.query.scheduleId, "timeslot_arr._id": req.query.slotId },
        {
          $set: {
            "timeslot_arr.$.timeOn": "off",
          },
        }
      ).then(async (u) => {
        await Timeslot.findOne(
          {
            _id: req.query.scheduleId,
            "timeslot_arr._id": req.query.slotId,
          },
          { "timeslot_arr.$": 1 }
        ).then((user) => {
          res.status(200).send(user.timeslot_arr[0]["timeOn"]);
        });
      });
    } else {
      await Timeslot.updateOne(
        { _id: req.query.scheduleId, "timeslot_arr._id": req.query.slotId },
        {
          $set: {
            "timeslot_arr.$.timeOn": "on",
          },
        }
      ).then(async (u) => {
        await Timeslot.findOne(
          {
            _id: req.query.scheduleId,
            "timeslot_arr._id": req.query.slotId,
          },
          { "timeslot_arr.$": 1 }
        ).then((user) => {
          res.status(200).send(user.timeslot_arr[0]["timeOn"]);
        });
      });
    }
  });
};
exports.postNotValid = (req, res) => {
  req.flash("message8", "Please Login First");
  req.flash("messagefail", "Fail");
  res.redirect("/");
};
exports.postSignUp = async (req, res) => {
  try {
    let d = "off";
    if (req.body.isDoctor == "on") {
      d = req.body.isDoctor;
    } else {
      d = "off";
    }

    const signupUser = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      date: req.body.date,
      pnumber: req.body.pnumber,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      myfile: "vector-users-icon.webp",
      doctor_hai: d,
    });

    const signedUser = await signupUser.save();
    if (req.body.isDoctor == "on") {
      req.session.Doctorname = req.body.name;
      res.status(201).redirect("/doctor_form");
    } else {
      res.status(201).redirect("/");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.addRecord = async (req, res) => {
  let arr = [];
  if (req.file.filename) {
    let file = req.file.filename.toString();
    let r = {
      file: file,
    };

    arr.push(r);
  }

  const records = new Record({
    myfile: arr,
    doctorname: req.body.doctorname,
    title: req.body.title,
    name: req.body.name,
    date: req.body.date,
    reportType: req.body.reportType,
  });

  const record = await records.save();
  res.status(201).redirect("/medicalreports");
};
exports.postDoctorFormPage = async (req, res) => {
  let doctorname = req.session.Doctorname;
  let hospitals = JSON.parse(req.body.hospitals)
    .map((item) => {
      return item["value"];
    })
    .toString();
  let achievement = JSON.parse(req.body.achievement)
    .map((item) => {
      return item["value"];
    })
    .toString();
  let qualification = JSON.parse(req.body.qualification)
    .map((item) => {
      return item["value"];
    })
    .toString();
  let awards = JSON.parse(req.body.awards)
    .map((item) => {
      return item["value"];
    })
    .toString();
  let spcialization = JSON.parse(req.body.spcialization)
    .map((item) => {
      return item["value"];
    })
    .toString();
  try {
    const doctorin = new Doctorinfo({
      doctorname: doctorname,
      describe: req.body.describe,
      myfile: req.file.filename,
      hospitals: hospitals,
      achievement: achievement,
      experience: req.body.experience,
      qualification: qualification,
      awards: awards,
      spcialization: spcialization,
      avgfees: req.body.avgfees,
    });

    await Signup.updateOne(
      { name: doctorname },
      {
        $set: {
          myfile: req.file.filename,
        },
      }
    ).then(async () => {
      const dctorUser = await doctorin.save();
      res.status(201).render("login");
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email == "admin@gmail.com" && password == "12345") {
      req.session.loggedin_admin = true;
      res.redirect("/Admin_Dashboard");
    } else {
      const useremail = await Signup.findOne({ email: email });
      const doctor_hai = await Doctorinfo.findOne({
        doctorname: useremail.name,
      });
      if (useremail.password === password) {
        req.session.loggedin = true;
        req.session.username = useremail.name;
        req.session.phone = useremail.pnumber;
        if (doctor_hai) {
          req.session.doctor_hai = doctor_hai.doctorname;
        }
        req.flash("message", "Login Sucessfully");
        req.flash("message1", "Success");

        res.status(201).redirect("/index");
      } else {
        req.flash("message2", "Invalid Email or Password");
        req.flash("messagefail", "Fail");
        res.redirect("/");
      }
    }
  } catch (error) {
    req.flash("message2", "Invalid Email or Password");
    req.flash("messagefail", "Fail");
    res.redirect("/");
  }
};
exports.postCreateSchedules = async (req, res) => {
  const startTime = moment(req.body.startTime, "HH:mm A");
  const endTime = moment(req.body.endTime, "HH:mm A");
  let arr = [];

  while (startTime <= endTime) {
    let str = {
      timing: "",
      timeOn: "off",
    };
    str.timing = moment(startTime).format("hh:mm A");
    arr.push(str);
    startTime.add(req.body.interval, "minutes");
  }
  // console.log(arr);

  const doctorname = req.session.doctor_hai;

  const time_slot = new Timeslot({
    doctorname: doctorname,
    day: req.body.day,
    hospital: req.body.hospital,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    interval: req.body.interval,
    switch: "off",
    timeslot_arr: arr,
  });

  const timeSlots = await time_slot.save();
  res.status(201).redirect("/schedules");
};
exports.postResetPassword = (req, res) => {
  const email = req.body.email;
  //console.log(req.body);
  Signup.findOne({ email: email }).then((user) => {
    if (user) {
      req.session.createpassword = true;
      req.session.pnumber = user.pnumber;
      return res.redirect(307, "/otp/123456");
    } else {
      req.flash("message2", "Invalid Email or Password");
      req.flash("messagefail", "Fail");
      return res.redirect("/");
    }
  });
};

exports.postCreatePassword = async (req, res) => {
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  try {
    if (password == cpassword) {
      await Signup.updateOne(
        { pnumber: req.session.pnumber },
        {
          $set: {
            password: password,
          },
        }
      ).then(() => {
        req.flash("message7", "Password Changed Successfully");
        req.flash("message1", "Success");
        return res.redirect("/");
      });
    } else {
      req.flash("message6", "Passwords do not match");
      req.flash("messagefail", "Fail");
      return res.redirect("/create-password");
    }
  } catch {
    req.flash("message6", "Passwords do not match");
    req.flash("messagefail", "Fail");
    return res.redirect("/create-password");
  }
};

exports.postOtpToken = (req, res) => {
  const pnumber = req.body.pnumber || req.session.pnumber;
  req.session.number = pnumber;

  Signup.findOne({ pnumber: pnumber || req.session.number }).then((user) => {
    if (user) {
      const otp = otpManager.create(req.params.token);
      req.body.recieverNumber = pnumber;

      req.session.username = user.name;
      req.session.loggedin = true;
      console.log(req.body);
      otpSender.send(otp, req.body);
      console.log(`Your token code is ${otp.token} and otp is ${otp.code}`);
      req.flash("messageInfo", "Info");
      req.flash("message4", "OTP valid for 60 sec");

      return res.redirect("/otp");
    } else {
      req.flash("message3", "User Not Registered");
      req.flash("messagefail", "Fail");
      return res.redirect("/phone-login");
    }
  });
};

exports.postOtp = (req, res) => {
  const otpnumber = req.body.otpnumber;

  res.redirect("/otp/123456/" + otpnumber);
};

exports.verifyOtp = (req, res) => {
  const verificationResults = otpManager.VerificationResults;
  const verificationResult = otpManager.verify(
    req.params.token,
    req.params.code
  );
  let statusCode;
  let bodyMessage;

  switch (verificationResult) {
    case verificationResults.valid:
      statusCode = 200;
      bodyMessage = "OK";

      if (req.session.createpassword) {
        return res.redirect("/create-password");
      } else {
        req.flash("message", "Login Sucessfully");
        req.flash("message1", "Success");
        return res.redirect("/index");
      }

    case verificationResults.notValid:
      statusCode = 404;
      bodyMessage = "Not found";

      req.flash("message5", "InValid OTP");

      req.flash("messagefail", "Fail");

      return res.redirect("/otp");

      break;
    case verificationResults.checked:
      statusCode = 409;
      bodyMessage = "The code has already been verified";
      break;
    case verificationResults.expired:
      statusCode = 410;
      bodyMessage = "The code is expired";
      break;
    default:
      statusCode = 404;
      bodyMessage = "The code is invalid for unknown reason";
  }
};
