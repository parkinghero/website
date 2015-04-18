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
  var URL = config.issuesUrl;
  var IMAGE_URL = config.photosUrl;

  $.ajax(URL, []).done(function(issues) {
    $.each(issues, function(i, issue) {
      var stringIssueBlockContent = '<div class="col-md-4 col-sm-6 portfolio-item">' +
          '<a href="#portfolioModal1" class="portfolio-link" data-toggle="modal">' +
          '<div class="portfolio-hover">' +
          '<div class="portfolio-hover-content">' +
          '<i class="fa fa-plus fa-3x"></i>' +
          '</div>' +
          '</div>' +
          '<img src="' + IMAGE_URL + '/' + issue.photoFileName + '" class="img-responsive" alt="">' +
          '</a>' +
          '<div class="portfolio-caption">' +
          '<h4>' + issue.title + '</h4>' +
          '<p class="text-muted">' + issue.description + '</p>' +
          '</div>' +
          '</div>';

      $('#issuesBlock').append(stringIssueBlockContent);
    });
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
        beforeSubmit: this.validate.bind(this),
        success: function() {
          // that.clear();
        }
    });
  },
  clear: function() {
    var $form = this.$this;

    $form.find('input[name]').val('');
    $form.find('select').each(function() {
      $(this).val( $(this).find('option:first').val() );
    });
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
        $form.block();
        data.submit();
      },
      error: function() {
        $form.unblock();
        alert('Вибачте, у нас помилка..:(');
      },
      done: function (event, response) {
        $form.unblock();
        // if (e) return alert('Error! Sorry, we have temporary problems...');

        $form.find('.upload-photo-button').addClass('have-photo');
        $form.find('.upload-button-text').hide();
        $form.find('[name="photoFileName"]').val(response.result.photoFileName);
        $form.find('.photo-preview').removeClass('hidden').show().attr('src', config.apiUrl + '/photos/orig/' + response.result.photoFileName).show();
      }
    });
  }
}
