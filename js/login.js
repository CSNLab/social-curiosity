'use strict';

(function () {
    var subid, email, phone, timestamp;
    var url;

    $('#confirmation').hide();

    function check_name() {
        var errmsg = 'Please enter English alphabets and numbers only';
        $(this)[0].setCustomValidity(/^[0-9a-zA-Z '-]*$/.test($(this).val()) ? '' : errmsg);
    }
    $('#subid').change(check_name);

    $('#phone').change(() => {
        var errmsg = 'Please enter your 10-digit phone number';
        $('#phone')[0].setCustomValidity(/^[0-9]{10}$/.test($('#phone').val()) ? '' : errmsg);
    });

    function submit_info() {
        subid = $('#subid').val();
        email = $('#email').val();
        phone = $('#phone').val();

        // ask to double check
        $('#info-check').append('<p>Your subject ID: <strong>' + subid + '</strong></p>')
        $('#info-check').append('<p>Your email: <strong>' + email + '</strong></p>')
        $('#info-check').append('<p>Your phone number: <strong>' + phone + '</strong></p>')
        $('#info-form').hide();
        $('#confirmation').show();
        $('#correct-info').hide();
    }
    window.submit_info = submit_info;

    $('#refresh-btn').click(() => {
        location.reload();
    });

    $('#confirm-btn').click(() => {
        let ts = timestamp.valueOf().toString();
        url = 'user=' + subid + '&timestamp=' + ts + '&l=4';

        window.save_user2firebase(subid, ts, url.replace(ts, '0000000000000'), {
            subid: subid,
            email: email,
            phone: phone,
            login_start_time: timestamp.toString()
        });

        $('#info-form').hide();
        $('#confirmation').hide();
        $('#correct-info').hide();
    });

    timestamp = new Date();
})();
