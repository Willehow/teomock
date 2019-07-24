var sendMessage;
var destroyChat;
var buildChat;

var ip = '';
var target;
var builder;
(function () {
    window.onload = function () {
        toogleChat = function () {
            builder.toogleChat();
        }

        sendMessage = function () {
            let msgFieldValue
            try {
                msgFieldValue = JSON.parse(document.getElementById('test-message').value);
            } catch (error) {
                msgFieldValue = document.getElementById('test-message').value;
            }
            builder.sendMessage(msgFieldValue);
        }

        sendCommand = function () {
            try {
                const command = JSON.parse(document.getElementById('test-command').value);
                builder.sendCommand(command);
            } catch (error) {
                alert('Comando invalido')
            }
        }

        destroyChat = function () {
            builder.destroy();
            builder = null;
        }

        buildChat = function (authConfig) {
            if (builder) {
                destroyChat();
            }

            if (authConfig && authConfig.authType == BlipChat.DEV_AUTH) {
                authConfig.userIdentity = document.getElementById('username').value ? document.getElementById('username').value : '01684334-71c7-40e0-ad1a-5ce372de1a08', // Required
                    authConfig.userPassword = document.getElementById('password').value ? document.getElementById('password').value : 'MjU2OWNmOTItYmRjZi00Njg0LTljZDktMWQxNjQxYmYxMGU1', // Required
                    authConfig.userName = document.getElementById('username').value ? document.getElementById('username').value : '', // Optional
                    authConfig.userEmail = document.getElementById('email').value ? document.getElementById('email').value : ''// Optional
            }

            const environment = document.getElementById('environment').value ? document.getElementById('environment').value : 'homolog'
            const appKey = document.getElementById('app-key').value || 'YmxpcHRlc3RjYXJkczo3YTcwZTUyNi04YzNjLTRmNGQtYWZjYi00ZWFmNzk5ZDFmNjk='

            const customStyle = '';

            builder = new BlipChat()
                .withAppKey(appKey)
                .withButton({ "color": "#2f469d" })
                .withTarget('sdk-target')
                .withEnvironment(environment)
                .withAuth(authConfig)
                .withAccount({
                    "fullName": document.getElementById('username').value ? document.getElementById('username').value : 'Teste',
                    "encryptMessageContent": true
                })

            builder.build();


        }

        changeSDK = function () {
            if (target) {
                target = null;
            } else {
                target = 'sdk-target';
            }

            buildChat();
        }

        applyValues = function () {
            options.window.title = document.getElementById('title').value;
            options.window.iconPath = document.getElementById('iconPath').value;
            options.window.widgetColor = document.getElementById('widgetColor').value;
            options.window.hideMenu = !document.getElementsByName('hideMenu')[1].checked;

            buildChat(options.config.authType);
        }

        buildChat();
    }
})();

function updateContacts(username) {

    try {
        const data = {
            "id": generateUUID(),
            "method": "merge",
            "uri": "/contacts",
            "type": "application/vnd.lime.contact+json",
            "resource": {
                "identity": username + ".teoconsultorvirtual@0mn.io",
                "extras": {
                    "cpf": username,
                    "login": true,
                    "token": token
                }
            }
        };

        $.ajax({
            url: "https://msging.net/commands",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Authorization": "Key dGVvY29uc3VsdG9ydmlydHVhbDpBNEFmZ2pCbVpOU29memxPOVFieA==",
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        alert(err);
    }
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}