angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $ionicModal, $http, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Create the login modal that we will use later

  // document.querySelector("input").onfocus = function (e) {
  //   console.log('sibling');
  //   $(this).parent().next().html(" ");
  //   console.log($(this).parent().next());
  //   // this.parentNode.findByTagName('input').innerHTML = "";
  // };

  $("select, input").focus(function() {
    $(this).parent().next().html(" ");
    // console.log('sasamba with dom', $(this).parent().next());
  });

  $scope.removeError = function(number) {
    $("#error"+number).html(" ");  
  };

  

  $ionicModal.fromTemplateUrl('templates/registration.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalReg = modal;
  });
  $ionicModal.fromTemplateUrl('templates/password-1.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRecov1 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/password-2.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRecov2 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/password-3.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRecov3 = modal;
  });

  $scope.regData = {};
  $scope.loginData = {};
  $scope.recovData1 = {};
  $scope.recovData2 = {};
  $scope.recovData3 = {};


  // Triggered in the registration modal to close it
  $scope.closeReg = function() {
    $scope.modalReg.hide();
  };
  // Open the registration modal
  $scope.openReg = function() {
    $scope.modalReg.show();
    //requsts
    var adres = 'http://farm.shop4u.by/rest/web/v1/';
    $http.get(adres+'cities').success(function(response) {
      $scope.cities = response;
      console.log('cities', response);
    });
    $http.get(adres+'education').success(function(response) {
      $scope.educations = response;
      console.log('educations', response);
    });
    $http.get(adres+'firms').success(function(response) {
      $scope.firms = response;
      console.log('firms', response);
    });
    $http.get(adres+'sex').success(function(response) {
      $scope.sexies = response;
      console.log('sexies', response);
    });
    $http.get(adres+'pharmacies').success(function(response) {
      $scope.pharmacies = response;
      console.log('pharmacies', response);
    });
    };

  // Perform the login action when the user submits the login form
  $scope.doReg = function() {
    console.log('Doing reg', $scope.regData);
    $http.post('http://farm.shop4u.by:80/rest/web/v1/join', $scope.regData, function(data, textStatus, xhr) {
      console.log('data', data);
    })
    .error(function(data) {
      console.log('hut zalupa', data);
      // $scope.regOutput = JSON.stringify(data);
      data = data[0];
      console.log(data.field);
      document.querySelector(".registration-page .field-"+data.field+"+.my-error").innerHTML = data.message;
    })
    .success(function() {
      $scope.closeReg();
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeReg();
    // }, 1000);
  };

  $scope.doLog = function() {
    $http.post('http://farm.shop4u.by:80/rest/web/v1/login', $scope.loginData, function(data, textStatus, xhr) {
      console.log('data', data);
    })
    .error(function(data) {
      console.log('nevdaha', data);

      //validation
      // $(".item-input").removeClass("has-error");
      // $(".item-input .my-error").text("");
      // $(".overlay").fadeIn();
      // var url = "http://farm.shop4u.by/rest/web/v1/join";
      // var self = $(this);

        // data = JSON.parse(data)[0];
        data = data[0];
        document.querySelector(".login-page .field-"+data.field+"+.my-error").innerHTML = data.message;
        // group = document.getElementsByClassName("field-"+data.field);
        // group.className = group.className + " has-error";
        // group.addClass("has-error");
        
        // group.find(".my-error").text(data.message);
      
      // $.ajax({
      //        type: "POST",
      //        url: url,
      //        data: self.serialize(),
      //        success: function(data)
      //        {
      //         $(".overlay").fadeOut();
      //                // window.location = "http://pogugli.com/?95143";
      //           console.log(data);
      //        },
      //    error: function(response) {
      //     data = JSON.parse(response.responseText)[0];
      //     group = $(".field-"+data.field);
      //     group.addClass("has-error");
      //     group.find(".help-block").text(data.message);
      //     $(".overlay").fadeOut();
      //    }
      // });
    })
    .success(function(data) {
      console.log('redirecting to main', data);
      token = data;  //TOKEN HERE
      $state.go('app.main');
    })
  };

  $scope.openRecov1 = function() {
    console.log('HERE');
    $scope.closeRecov3();
    $scope.modalRecov1.show();
  };
   $scope.closeRecov1 = function() {
    console.log('HERE');
    $scope.modalRecov1.hide();
  };
  $scope.doRecov1 = function() {
    console.log('scope recov data', $scope.recovData1);
    $http.put('http://farm.shop4u.by:80/rest/web/v1/reset-token', $scope.recovData1, function(data, textStatus, xhr) {
      console.log('recovery data', data);
    })
    .error(function(data) {
      console.log(data);
    })
    .success(function(data) {
      console.log(data, 'my data', $scope.recovData1);
      $scope.closeRecov1();
      $scope.openRecov2();
    })
  };

  $scope.openRecov2 = function() {
    console.log('HERE');
    console.log('modal 1 has removed');
    $scope.modalRecov2.show();
  };
   $scope.closeRecov2 = function() {
    console.log('HERE');
    $scope.modalRecov2.hide();
  };
  $scope.doRecov2 = function() {
    console.log('doing code', $scope.recovData2.reset_token);
    $http.get('http://farm.shop4u.by:80/rest/web/v1/reset-token?reset_token='+$scope.recovData2.reset_token, function(data, textStatus, xhr) {
      console.log('recovery data', data);
    })
    .error(function() {
      console.log('error with code', $scope.recovData2);
    })
    .success(function(data) {
      console.log('success with code', data);
      if (data == false) {
        alert('nepravilno');
      }
      else if (data == true) {
         $scope.openRecov3()
      }
    })
  };

  $scope.openRecov3 = function() {
    console.log('2 object', $scope.recovData2);
    console.log('3 object', $scope.recovData3);
    $scope.recovData3.reset_token = $scope.recovData2.reset_token;
    console.log('modal 2 has removed');
    $scope.modalRecov3.show();
  };
   $scope.closeRecov3 = function() {
    console.log('HERE');
    $scope.modalRecov3.hide();
  };
   $scope.doRecov3 = function() {
    $http.put('http://farm.shop4u.by:80/rest/web/v1/reset-password', $scope.recovData3, function(data, textStatus, xhr) {
      console.log('recovery data', data);
    })
    .error(function() {
      console.log('error with code', $scope.recovData3);
    })
    .success(function(data) {
      //clear all modals
      $scope.modalRecov1.remove();
      $scope.modalRecov2.remove();
      console.log('success with code', data);
      $scope.closeRecov3();
    })
  };

})
.controller('MainCtrl', function($scope, $ionicModal, $http, $state, $ionicSlideBoxDelegate, $timeout) {
  console.log(1);

  //reg page
  $scope.c   = function() {
    ngDialog.open({ template: 'templates/agreement.html' });
    console.log('privet soglasheniye');
  };
  // var token = 'xql3c4qL6Ktrh_4AoNy7E-4vqvcTq0912vLbcIcTIDSJVF3JBckA-nJ8RU9eqDyb'; //TOKEN HERE


  //main page
  $scope.bannerData = [];
  $scope.$on('$ionicView.beforeEnter', function() {
    console.log(token);
    $http.get('http://farm.shop4u.by:80/rest/web/v1/banners?access-token='+token, function(data, textStatus, xhr) {
      })
      .error(function(data) {
        console.log('no banners', data);
      })
      .success(function(data) {
        console.log('banners', data);
          // $scope.bannerData = data;

        for (index in data) { //begin of loop
              if (data[index].position == 1)
              {
                $scope.bannerData.push(data[index]);
              }
              if (data[index].position == 2) {
                document.getElementById('pos-2').src = data[index].image;
                document.getElementById('title-2').innerHTML = data[index].title;
                var tmp2 = data[index].link;
                document.getElementById("pos-2").addEventListener("click", function() {
                console.log('got this bitch 2', tmp2);
                  $scope.openLink(tmp2);
                });
              }
            if (data[index].position == 3) {
              document.getElementById('pos-3').src = data[index].image;
              document.getElementById('title-3').innerHTML = data[index].title;
              var tmp3 = data[index].link;
              document.getElementById("pos-3").addEventListener("click", function() {
                console.log('got this bitch 3', tmp3);
                  $scope.openLink(tmp3);
                });
            }
           if (data[index].position == 4) {
              document.getElementById('pos-4').src = data[index].image;
              document.getElementById('title-4').innerHTML = data[index].title;
              var tmp4 = data[index].link;
              document.getElementById("pos-4").addEventListener("click", function() {
                console.log('got this bitch 4', tmp4);
                  $scope.openLink(tmp4);
                });
            }
            if (data[index].position == 5) {
              document.getElementById('pos-5').src = data[index].image;
              document.getElementById('title-5').innerHTML = data[index].title;
              var tmp5 = data[index].link;
              document.getElementById("pos-5").addEventListener("click", function() {
                console.log('got this bitch 5', tmp5);
                  $scope.openLink(tmp5);
                });
            }
            if (data[index].position == 6) {
              document.getElementById('pos-6').src = data[index].image;
              document.getElementById('title-6').innerHTML = data[index].title;
              var tmp6 = data[index].link;
              document.getElementById("pos-6").addEventListener("click", function() {
                console.log('got this bitch 6', tmp6);
                  $scope.openLink(tmp6);
                });
             }
           if (data[index].position == 7) {
              document.getElementById('pos-7').src = data[index].image;
              document.getElementById('title-7').innerHTML = data[index].title;
              var tmp7 = data[index].link;
              document.getElementById("pos-7").addEventListener("click", function() {
                console.log('got this bitch 7', tmp7);
                  $scope.openLink(tmp7);
                });
          }
            if (data[index].position == 8) {
              document.getElementById('pos-8').src = data[index].image;
              document.getElementById('title-8').innerHTML = data[index].title;
              var tmp8 = data[index].link;
              document.getElementById("pos-8").addEventListener("click", function() {
                console.log('got this bitch 8', tmp8);
                  $scope.openLink(tmp8);
                });
            }

        } //end of loop

        $timeout(function(){
          $ionicSlideBoxDelegate.$getByHandle('main-slider').update();
        },1000);

        // for (index in data) {
        //   // console.log('tick', data[banner]);
        //   if (data[index].position == 2) {
        //    document.getElementById('pos-2').src = data[index].image;
        //    document.getElementById('title-2').innerHTML = data[index].title;
        //   }
        //   if (data[index].position == 3) {
        //    document.getElementById('pos-3').src = data[index].image;
        //    document.getElementById('title-3').innerHTML = data[index].title;
        //   }
        //   if (data[index].position == 4) {
        //    document.getElementById('pos-4').src = data[index].image;
        //    document.getElementById('title-4').innerHTML = data[index].title;
        //   }
        //   if (data[index].position == 5) {
        //    document.getElementById('pos-5').src = data[index].image;
        //    document.getElementById('title-5').innerHTML = data[index].title;
        //   }
        // }
    }); //END OF SCOPE.ON 

  

  // $http.get('http://farm.shop4u.by:80/rest/web/v1/user?expand=education,firm,city,pharmacy,position,avatar&access-token='+'GEa-eey3PaUp5--NqNK1UEw9nZ4zz7O-sXtySh5XBZjPMEMH9lKA97EMPEYqqXIE', function(data, textStatus, xhr) {
  $http.get('http://farm.shop4u.by:80/rest/web/v1/user?expand=education,firm,city,pharmacy,position,avatar&access-token='+token, function(data, textStatus, xhr) {
  })
  .error(function() {
    console.log('error');
  })
  .success(function(data) {
    console.log('success', data);
    $scope.user = data;
    document.getElementById('user_avatar').src = data.avatar;
    document.getElementById('user_name').innerHTML = data.name;
    document.getElementById('user_education').innerHTML = data.education.name;
    document.getElementById('user_pharm').innerHTML = data.firm.name+', '+data.city.name;
    // document.getElementById('user_city').innerHTML = data.city.name;
    console.log('OSEL', $scope.user);
  });


  }); //scope.on end
  
  $scope.loadSurveys = function() {
    $http.get('http://farm.shop4u.by:80/rest/web/v1/surveys?access-token='+token, function(data) {
        // console.log(data); 
      })
    .error(function( data) {
      console.log('fail', data);
    })
    .success(function(data) {
      console.log('success', data);
      $scope.surveys = data; 
    }); 
  };

  // function transformDate (now) {
  //   year = "" + now.getFullYear();
  //   month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  //   day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  //   hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  //   minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  //   second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  //   return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  // }

  // $scope.datepickerObject = {
  //     titleLabel: 'Title',  //Optional
  //     todayLabel: 'Today',  //Optional
  //     closeLabel: 'Close',  //Optional
  //     setLabel: 'Set',  //Optional
  //     setButtonType : 'button-assertive',  //Optional
  //     todayButtonType : 'button-assertive',  //Optional
  //     closeButtonType : 'button-assertive',  //Optional
  //     inputDate: new Date(),    //Optional
  //     mondayFirst: true,    //Optional
  //     weekDaysList: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],   //Optional
  //     monthList: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'], //Optional
  //     templateType: 'popup', //Optional
  //     modalHeaderColor: 'bar-positive', //Optional
  //     modalFooterColor: 'bar-positive', //Optional
  //     from: new Date(2012, 8, 2),   //Optional
  //     to: new Date(2018, 8, 25),    //Optional
  //     callback: function (val) {
  //       if (typeof(val) === 'undefined') {
  //         console.log('No date selected');
  //       } else {
  //         console.log('Selected date is : ', val);
  //         $scope.seminarData.date_sign = transformDate(val);
  //         // console.log('Perfect date is : ', tmp);
  //       }
  //     }
  //   };

    $scope.nowDate = function() {
      console.log(Date());
      $scope.seminarData.date_sign = 'Сейчас';
    };

    $scope.showSeminar = function() {
      $('.seminar-registration').fadeIn();
    };

    $scope.out = function(event) {
      console.log(event.target);
      if ($(event.target).hasClass('seminar-registration') == true || $(event.target).hasClass('registration-input') == true) {
        console.log('JIRAFIK');
        $('.seminar-registration').fadeOut();
      }

      // if (event.currentTarget.hasClass('seminar-registration')) {
      //   $('.seminar-registration').fadeOut();
      //     console.log('svinya');
      // }
    
    };


    // $('seminar-registration').children().click(function(event) {
    //   event.stopPropagation();
    // });

  $scope.seminarData = {};
  $scope.doSeminar = function() {

    // $scope.seminarData.date_sign = $scope.seminarData.date + " " + $scope.seminarData.time;
    $http.post('http://farm.shop4u.by:80/rest/web/v1/seminar?access-token='+token, $scope.seminarData, function(data, textStatus, xhr) {
      })
    .error(function(data) {
      console.log('fail', $scope.seminarData,'second fail',data);
      alert(data[0].message);
    })
    .success(function(data) {
      console.log('success', data);
      $('.seminar-registration').css('display', 'none');
      alert('Вы успешно записаны на семинар');
    });
  };
  $scope.loadSeminars = function() {
    $http.get('http://farm.shop4u.by:80/rest/web/v1/seminars?access-token='+token, function(data) {
        // console.log(data); 
      })
    .error(function( data) {
      console.log('fail', data);
    })
    .success(function(data) {
      console.log('success', data);
      $scope.seminars = data; 
    }); 
  };

   $ionicModal.fromTemplateUrl('templates/survey-open.html', {
    scope: $scope
    }).then(function(modal) {
      $scope.modalSurvey = modal;
    });
    $ionicModal.fromTemplateUrl('templates/seminar-open.html', {
    scope: $scope
    }).then(function(modal) {
      $scope.modalSeminar = modal;
    });

    $scope.test = function() {
      $http.get('http://farm.shop4u.by:80/rest/web/v1/banners?access-token='+token, function(data, textStatus, xhr) {
      })
      .error(function(data) {
        console.log('no banners', data);
      })
      .success(function(data) {
        console.log('banners', data);
      });
    };

    $scope.openSeminars = function(id) {
      // console.log('HERE');
      $http.get('http://farm.shop4u.by:80/rest/web/v1/seminar/'+id+'?expand=description,isSigned&access-token='+token, function(data) {
      })
      .error(function(data) {
        console.log(data);
      })
      .success(function(data) {
        console.log(data, 'yo');
        $scope.seminar = data;
        $scope.modalSeminar.show();
        $scope.seminarData.seminar_id = id;
      });
    };
    $scope.closeSeminars = function() {
      // console.log('HERE');
      $scope.modalSeminar.hide();
    };

    $scope.openQuestions = function(id) {
      // console.log('HERE');
      $http.get('http://farm.shop4u.by:80/rest/web/v1/survey/'+id+'?expand=description,questions&access-token='+token, function(data) {
      })
      .error(function(data) {
        console.log(data);
      })
      .success(function(data) {
        console.log(data, 'yo');
        $scope.survey = data;
        $scope.modalSurvey.show();
      });
    };
    $scope.closeQuestions = function() {
      // console.log('HERE');
      $scope.modalSurvey.hide();
    };

    $scope.questionData = {};
    $scope.doSurvey = function() {
      $http.post('http://farm.shop4u.by:80/rest/web/v1/survey?access-token='+token, $scope.questionData, function(data, textStatus, xhr) {
      })
      .error(function(data) {
        console.log(data, 'fail');
       alert('Невозможно отправить анкету, проверьте вводимые данные');

      })
      .success(function(data) {
        console.log(data, 'horey');
       $scope.modalSurvey.hide();
       alert('Анкета успешно отправлена');
       $scope.questionData = {};
       $scope.loadSurveys();
      });
    };

    $scope.openLink = function(link) {
    // link.toString();
    console.log(typeof(link), link);
    var str = link.split('/');
    console.log(str);
    switch (str[0]) {
      case 'survey':
        $scope.openQuestions(str[1]);
        break;
      case 'seminar':
        $scope.openSeminars(str[1]);
        break;
      case 'block':
        alert('not ready');
        break;
      case 'present':
        alert('not ready');
        break;
      case 'report':
        alert('not ready');
        break;
    }
  };

});