firebase.initializeApp(config);

var fbRef = firebase.database();

$(document).ready(function() {
    $('#button').click(function() {
        var name = $("#name").val();
        var message = $("#message").val();
        add( name, message );
    });

    $('#message').keypress(function(e) {
        if (e.keyCode === 13) {
            var name = $("#name").val();
            var message = $("#message").val();
            add( name, message );
        }
    });

    $('#clear').click(function() {
        fbRef.ref('chat').set({});
    })
});

// var dataToSend = {
//     1: {
//         student_id: 456,
//         student_name: 'Bruce Wayne',
//         course: 'Criminal Justice',
//         grade: 95
//     },
//     2: {
//         student_id: 289,
//         student_name: 'Clark Kent',
//         course: 'Journalism',
//         grade: 89
//     }
// };
//
// fbRef.ref('students').set(dataToSend);

// var dataToSend = {
//     student_id: 357,
//     student_name: 'Oliver Queen',
//     course: 'Business Management',
//     grade: 94
// };
//
// fbRef.ref('students/3').set(dataToSend);

// var dataToSend = {
//     student_id: 754,
//     student_name: 'Berry Alan',
//     course: 'Forensic Science',
//     grade: 99
// };
//
// fbRef.ref('students').push(dataToSend);

// var updates = {};
//
// updates['students/1/course'] = 'Being Batman';
//
// fbRef.ref().update(updates);

// fbRef.ref('students/567').remove();

// fbRef.ref('students/567').set(null);

fbRef.ref('chat').on('value', function(snapshot) {
    var content = $('#content').html('');
    obj = snapshot.val();
    for(key in obj) {
        var div = $('<div>').text(obj[key].name + ': ' + obj[key].message);
        content.append(div);
    }
    $('#chat').scrollTop(content.height());
});

function add(name, message){
    var dataToSend = {
        name: name,
        message: message
    };
    fbRef.ref('chat').push(dataToSend);
}