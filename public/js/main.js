function initApp() {
  initIssueForm();
  loadIssues();
};

function initIssueForm() {
  var $form = $('.issue-form');

  buildUploader($form);

  var options = { 
      url: config.issuesUrl, 
      type: 'POST',
      dataType: 'json',
      beforeSubmit: function() {

      },
      success: function() {

      }
  }; 
  
  // bind form using 'ajaxForm' 
  $('.issue-form').ajaxForm(options);
}


function buildUploader($form) {

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
      $form.find('.photo-preview').removeClass('hidden').show().attr('src', config.apiUrl + '/photos/orig/' + response.result.photoFileName).show();
    }
  });

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
