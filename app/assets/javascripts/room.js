(function () {
  var roomId = $('#room-id').val();
  if (!roomId) {
    return;
  }

  var $messageArea = $('.message-area');
  var $messageForm = $('.message-form textarea');
  var messagesExpanded = false;

  $(function () {
    scrollToBottom($messageArea);
    onEnterMessageform();
    handleMessageAreaExpanding();
  });

  function onEnterMessageform () {
    $messageForm.on('keydown', function (e) {
      if (!this.value || !this.value.trim()) return;
      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        $('form#new_message').submit();
      }
    });
  }

  function handleMessageAreaExpanding () {
    var expander = $('.room-chat-expander').first();
    var headerTitleText = $('.room-chat-header-title').first().text();

    expander.on('click', function () {
      var roomsBox = $('.room-chat-rooms').first();
      var messagesBox = $('.room-chat-messages').first();
      var headerTitle = $('.room-chat-header-title').first();
      var headerSubtitle = $('.room-chat-header-subtitle').first();

      if (!messagesExpanded) {
        messagesBox
          .removeClass('col-sm-6')
          .addClass('col-sm-12');
        roomsBox.hide();
        expander.find('i')
          .removeClass('fa-expand')
          .addClass('fa-compress');
        expander.attr(
          'title',
          'Click to show the threads list'
        );
        headerTitle.text($('.room-item.active .media-heading').text());
        headerSubtitle.hide();
      } else {
        messagesBox
          .addClass('col-sm-6')
          .removeClass('col-sm-12');
        roomsBox.show();
        expander.find('i')
          .addClass('fa-expand')
          .removeClass('fa-compress');
        expander.attr(
          'title',
          'Click to expand the message area'
        );
        headerTitle.text(headerTitleText);
        headerSubtitle.show();
      }

      setRoomTitleExpander();

      messagesExpanded = !messagesExpanded;
    });
  }

  function setRoomTitleExpander () {
    var titleBox = $('.room-chat-header-title').first();

    if (titleBox[0].scrollHeight > 200) {
      titleBox.addClass('room-chat-header-title-long');
    } else {
      titleBox.removeClass('room-chat-header-title-long');
    }
  }
})();
