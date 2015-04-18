function init() {
  initIssueForm();
};

function initIssueForm() {
  var $form = $('.issue-form');

  buildUploader($form);

  var options = { 
      url: config.newIssueUrl, 
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
    url: config.uploadPhotoURL,
    dataType: 'json',
    add: function(event, data) {
      $.blockUI();
      data.submit();
    },
    done: function (event, response) {
      $.unblockUI();
      
      // if (e) return alert('Error! Sorry, we have temporary problems...');

      $form.find('.upload-photo-button').addClass('have-photo');
      $form.find('.upload-button-text').hide();
      $form.find('[name="file_id"]').val(response.result.id);
      $form.find('.photo-preview').removeClass('hidden').show().attr('src', response.result.tempUrl).show();
    }
  });

}
