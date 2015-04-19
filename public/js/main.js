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
          $.blockUI();
          return that.validate.bind(this);
        },
        success: function() {
          $.unblockUI();
          // that.clear();
        },
        error: function() {
          $.unblockUI();
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

    $issue.find('.issue-photo').attr('src', config.photosUrl + '/thumb/' + data.photoFileName);
    $issue.find('.issue-subject').html(data.subject);
    $issue.find('.issue-description').html(data.description);
  }
}
