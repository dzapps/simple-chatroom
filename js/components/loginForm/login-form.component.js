function loginFormController(dbService){
    var ctrl = this;

    ctrl.user = {};
    ctrl.uid = null;
    ctrl.displayName = '';
    ctrl.updateForm = false;

    ctrl.$onInit = function(){
        ctrl.returningUser();
    };

    ctrl.updateUser = function(){
        dbService.updateProfile({displayName: ctrl.newDisplayName}).then(function(update){
            ctrl.closeUpdate();
            ctrl.displayName = update.displayName;
            console.info('User updated');
        }).catch(function(err){
            console.warn('Failed profile update: ', err);
        });

    };

    ctrl.closeUpdate = function(){
        ctrl.newDisplayName = '';
        ctrl.updateForm = false;
    };

    ctrl.returningUser = function(){
        dbService.wasLoggedIn().then(function(user){
            console.log('Welcome Back');
            ctrl.uid = user.uid;
            ctrl.displayName = user.displayName;
            ctrl.onSignIn({userId: ctrl.uid});
        }).catch(function(){
            console.log('No user Data');
        });
    };

    ctrl.newUser = function(){
        console.log('User info: ', ctrl.user);
        dbService.createUser(ctrl.user.email, ctrl.user.password).then(function(user){
            console.log('User created:', user);
            ctrl.uid = user.uid;
            ctrl.displayName = user.displayName;
        }).catch(function(err){
            console.warn('User not created:', err);
        });
    };

    ctrl.loginUser = function(){
        dbService.login(ctrl.user.email, ctrl.user.password).then(function(user){
            console.log('User logged in:', user);
            ctrl.uid = user.uid;
            ctrl.displayName = user.displayName;
            ctrl.onSignIn({userId: ctrl.uid});
        }).catch(function(err){
            console.warn('Failed login:', err);
        });
    };

    ctrl.logoutUser = function(){
        dbService.logout().then(function(){
            console.log('User logged out');
            ctrl.uid = null;
            ctrl.displayName = '';
        }).catch(function(err){
            console.warn('Failed to logout user:', err);
        });
    };

}

angular.module('todoList').component('loginForm', {
    templateUrl: './js/components/loginForm/login-form.component.html',
    controller: loginFormController,
    bindings: {
        onSignIn: '&'
    }
});