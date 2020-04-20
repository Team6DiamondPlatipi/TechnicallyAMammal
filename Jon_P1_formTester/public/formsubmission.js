$(document).ready(function(){  
     $("#submit").on("click", function(){
        event.preventDefault();
        var name = $('#name').val();
        var middle = $('#middle').val();
        var lastname = $('#lastname').val();
        var suffix = $('#suffix').val();
        var ssn = $('#ssn').val();
        var hphone = $('#hphone').val();
        var dob = $('#dob').val();
        var school = $('#school').val();
        var email = $('#email').val();
        var age = $('#age').val();
        // Convert Data into JSON 
        var form = $('form').serializeArray();

        if (name == '' || middle == '' || lastname == '' || suffix == '' || ssn== '' || hphone== '' || dob == '' || school == '' || email == '' || age == ''){
            $('#displaymessage').html('<span class="text-danger">All fields are required.</span>');
        }
        //  else {
        //      $.ajax({
        //          method: 'POST',
        //          data: $('#submit').serializeArray(),
        //          success: function(data) {
        //             $('#displaymessage').html('<span class="text-danger">Thanks for submitting.</span>');
        //             $('form').trigger("reset");
        //             console.log(form);
        //         }
        //      });
        //  }
        else {
            $('#displaymessage').html('<span class="text-danger">Thank you!</span>'); 
            console.log(form);
            document.getElementById('myformid').reset();
        }
     });
});
