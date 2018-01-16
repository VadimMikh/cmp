function app() {
    var body = document.querySelector('body'),
        addFriend = document.querySelector('.add_friend'),
        navigateBut = document.querySelectorAll('.navigate'),
        likeBut = document.querySelectorAll('.star'),
        messageInput = document.getElementById('message'),
        chatBox = document.querySelector('.chat');

    Element.prototype.parents = function(selector) {
        var elements = [];
        var elem = this;
        var ishaveselector = selector !== undefined;

        while ((elem = elem.parentElement) !== null) {
            if (elem.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (!ishaveselector || elem.matches(selector)) {
                elements.push(elem);
            }
        }
        return elements;
    };

    function friend(e) {
        e.preventDefault();
        body.classList.toggle('friend');
    }

    function navigate(e) {
        e.preventDefault();
        removeEvent();
        if (body.classList.contains('chat_active')) {
            body.classList.remove('chat_active');
            getPage('profile.html');
        } else {
            body.classList.add('chat_active');
            getPage('chat.html');
        }
    }

    function like(e) {
        e.preventDefault();
        e.target.parents('.star')[0].classList.toggle('liked');
    }

    navigateBut.forEach(function (item) {
        item.addEventListener('click', navigate);
    });

    function removeEvent() {
        navigateBut.forEach(function (item) {
            item.removeEventListener('click', navigate);
        });
    }

    likeBut.forEach(function (item) {
        item.addEventListener('click', like);
    });

    !!addFriend && addFriend.addEventListener('click', friend);

    function Message () {
        this.div = document.createElement('div');
        this.imgLink = document.createElement('a');
        this.imgWrap = document.createElement('div');
        this.img = document.createElement('img');
        this.textBox = document.createElement('div');
        this.mark = document.createElement('span');
        this.messages = [];;
    }

    Message.prototype = {
        constructor: Message,

        write: function write(text, cl, src) {
            var m = text;
            if (cl) {
                this.div.classList.add('message', cl);
            } else {
                this.div.classList.add('message');
            }
            this.imgLink.classList.add('message-user_image--wrap');
            if (src) {
                this.img.src = src;
            } else {
                this.img.src = 'img/boy.jpg';
            }
            this.textBox.classList.add('message-text');
            this.imgWrap.classList.add('message-user_image');
            this.mark.classList.add('message_online');

            this.imgLink.appendChild(this.img);
            this.imgWrap.appendChild(this.imgLink);
            this.imgWrap.appendChild(this.mark);
            this.div.appendChild(this.imgWrap);
            this.textBox.innerHTML = m;
            this.div.appendChild(this.textBox);

            return this.div;
        },

        add: function add(message) {
            saveMessage(message);
        }
    };

    var randomInt = function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var messageList = [],
        ramdomPharases = ['Hello, how are you?', 'Hi there, miss me?', 'Hi, lets chat?', 'Hello, where are being so long?'];
    function saveMessage(text) {
        messageList.push(text);
        var store = JSON.stringify(messageList);
        sessionStorage.setItem('messages', store);
    }
    function getMessages() {
        var store = sessionStorage.getItem('messages'),
            randMessageInd = randomInt(0, ramdomPharases.length - 1),
            randMessage = ramdomPharases[randMessageInd],
            mes = new Message();

        !!chatBox && chatBox.appendChild(mes.write(randMessage, 'partner', 'img/girl.jpg'));

        if (store) {

            messageList = JSON.parse(store);
            messageList.forEach(function (item) {
                var m = new Message();
                !!chatBox && chatBox.appendChild(m.write(item));
            });
        }
    }
    getMessages();

    function addMessage(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var v = messageInput.value,
                m = new Message(),
                res = m.write(v);

            m.add(v);
            v !== '' && chatBox.appendChild(res);

            messageInput.value = '';
        }
    }
    !!messageInput && messageInput.addEventListener('keydown', addMessage);

}

function getPage(url) {
    var xhr = new XMLHttpRequest(),
        enterPoint = document.getElementById('main');

    xhr.open('GET', url, true);

    xhr.send();

    return xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            enterPoint.innerHTML = '<div class="not_found">Page not found</div>'
        } else {
            enterPoint.innerHTML = xhr.responseText;
            app();
        }

    };
    enterPoint.innerHTML = 'Loading...';
}
function init() {
    getPage('profile.html');
}
window.addEventListener('load', init);