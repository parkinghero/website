function initApp() {
  initIssueForm();
  loadIssues();
};

function initIssueForm() {
  var $form = $('.issue-form');

  var form = new PHForm($form);
  form.init();
}

function loadIssues() {
  $.ajax(config.issuesUrl + '?limit=6', []).done(function(issues) {
    new PHIssues($('#issuesBlock')).rebuild( issues.slice(0, 6).reverse() );
  });
}


function PHForm($elem) {
  this.$this = $elem;
};

PHForm.prototype = {
  init: function() {
    var $form = this.$this;
    var that = this;

    this._buildUploader();

    $form.ajaxForm({ 
        url: config.issuesUrl, 
        type: 'POST',
        dataType: 'json',
        beforeSubmit: function() {
          var isValid = that.validate.bind(this);
          if (isValid) {
            $.blockUI();
          } else {
            return false;
          }
        },
        success: function() {
          $msg = $('<h1>Вітаємо! Вашу заявку успішно відправлено.</h1><br><button class="btn btn-success">OK!</button>');
          $('.blockUI.blockMsg').html($msg).find('button').on('click', function() {
            $.unblockUI();
            that.clear();
          });

        },
        error: function() {
          $('.blockUI.blockMsg').html(
            '<h1>Отакої!... У нас сталася помилка</h1><br><button onclick="$.unblockUI();" class="btn btn-danger">Спробувати пізніше</button>'
          );
        }
    });
  },
  clear: function() {
    var $form = this.$this;
    $form.find('input[name]').val('');
    $form.find('textarea').val("");

    $form.find('[name="address"]').select2("val", "");
    $form.find('[name="violationType"]').select2("val", "");

    $form.find('.upload-photo-button').removeClass('have-photo');
    $form.find('.upload-button-text').show();
    $form.find('[name="photoFileName"]').val('');
    $form.find('.photo-preview').addClass('hidden').hide().attr('src', '');
  },
  validate: function() {
    var $form = this.$this;

    var isValid = true;

    $form.find(".validate").each(function() {
      var $this = $(this);
      var val = $this.val();

      if (val) return;

      var $group = $this.closest('.form-group');
      $group.addClass('has-error');
      $this.one('change', function() {
        $group.removeClass('has-error');
      });
      isValid = false;
    });

    return isValid;
  },
  _buildUploader: function() {
    var $form = this.$this;

    $form.find('.upload-photo-input').fileupload({
      url: config.photosUrl,
      dataType: 'json',
      add: function(event, data) {
        $.blockUI();
        data.submit();
      },
      error: function() {
        $.unblockUI();
        alert('Вибачте, у нас помилка..:(');
      },
      done: function (event, response) {
        $.unblockUI();
        // if (e) return alert('Error! Sorry, we have temporary problems...');

        $form.find('.upload-photo-button').addClass('have-photo');
        $form.find('.upload-button-text').hide();
        $form.find('[name="photoFileName"]').val(response.result.photoFileName);
        $form.find('.photo-preview').removeClass('hidden').show().attr('src', config.apiUrl + '/photos/thumb/' + response.result.photoFileName).show();
      }
    });
  }
}

function PHIssues($issues, issues) {
  this.$issues = $issues;
  this.issues = issues;
}

PHIssues.prototype = {
  destroy: function() {
    this.$issues.empty();
  },
  rebuild: function(data) {
    this.destroy();
    this.build(data);
  },
  build: function(issues) {
    var $issues = this.$issues;

    issues.forEach(function(data) {
      var issue = new PHIssue();
      $issues.append(issue.$issue);
      issue.build(data);
    });
  }
};


function PHIssue() {
  this.$issue = $( $('#issue-template').html() );
}

PHIssue.prototype = {
  build: function(data) {
    var $issue = this.$issue;

    $issue.data('issue', data);

    $issue.find('.issue-info').html(getVTypeText(data.violationType));
    $issue.find('.issue-date').html( moment(data.photographingDate).format('DD.MM.YYYY') );
    $issue.find('.issue-photo').attr('src', config.photosUrl + '/thumb/' + data.photoFileName);
    $issue.find('.issue-subject').html(data.subject);
    $issue.find('.issue-description').html(data.description);
  }
}


function getVTypeText(type) {
  return {
      a: "Паркування другим рядом",
      b: "Паркування під знаком \"зупинка заборонена",
      c: "Паркування на тротуарі",
      d: "Паркування на пішохідному переході",
      e: "Паркування на місці для інвалідів",
      f: "Паркування на газоні",
    }[type];
}

function initBigMap() {
  var $map = $('#big-map');

  $(window).resize(function() {
    $map.height( $(window).height() - $('header').height() - 1 );
  }).trigger('resize');

  $map.gmap3({
      map: {
         options: {
              zoom: 6,
              scrollwheel: true,
              center: [49.1439909,31.6966257],
              styles: [   {       featureType:'water',        stylers:[{color:'#74c9be'},{visibility:'on'}]   },{     featureType:'landscape',        stylers:[{color:'#f2f2f2'}] },{     featureType:'road',     stylers:[{saturation:-100},{lightness:45}]  },{     featureType:'road.highway',     stylers:[{visibility:'simplified'}] },{     featureType:'road.arterial',        elementType:'labels.icon',      stylers:[{visibility:'off'}]    },{     featureType:'administrative',       elementType:'labels.text.fill',     stylers:[{color:'#444444'}] },{     featureType:'transit',      stylers:[{visibility:'off'}]    },{     featureType:'poi',      stylers:[{visibility:'off'}]    }]
         }  
      }
  });

  var redmineIssuesUrl = 'http://issues.parkinghero.in.ua/issues';

  $.get(config.issuesUrl, function(issues) {
    issues.forEach(function(issue) {
      if (!issue.lat || !issue.lng) return;



      var data = getVTypeText(issue.violationType) + '<br>' +
            '<a target="_blank" href="' + redmineIssuesUrl + '/' + issue.redmineIssueId + '">' +
            issue.description + '</a><br>' +
            issue.licensePlateNumber;


      $map.gmap3({
          marker: {
            values:[
               {latLng:[issue.lat, issue.lng], data:data},
             ],
             options:{
                draggable: false
              },
              events:{
                click: function(marker, event, context){
                  var map = $(this).gmap3("get"),
                    infowindow = $(this).gmap3({get:{name:"infowindow"}});
                  if (infowindow){
                    infowindow.open(map, marker);
                    infowindow.setContent(context.data);
                  } else {
                    $(this).gmap3({
                      infowindow:{
                        anchor:marker, 
                        options:{content: context.data}
                      }
                    });
                  }
                },
                mouseout1: function(){
                  var infowindow = $(this).gmap3({get:{name:"infowindow"}});
                  if (infowindow){
                    infowindow.close();
                  }
                }
             }

          }
          
      });
    });
  }, 'json');
}
