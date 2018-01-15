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
        body.classList.contains('chat_active') ? body.classList.remove('chat_active') : body.classList.add('chat_active');
    }

    function like(e) {
        e.preventDefault();
        e.target.parents('.star')[0].classList.toggle('liked');
    }

    navigateBut.forEach(function (item) {
        item.addEventListener('click', navigate);
    });

    likeBut.forEach(function (item) {
        item.addEventListener('click', like);
    });

    !!addFriend && addFriend.addEventListener('click', friend);

    function Message (text) {
        this.text = text;
        this.div = document.createElement('div');
        this.imgLink = document.createElement('a');
        this.imgWrap = document.createElement('a');
        this.img = document.createElement('img');
        this.textBox = document.createElement('div');

        return this.write();
    }

    Message.prototype = {
        constructor: Message,

        write: function write() {
            this.div.classList.add('message');
            this.imgLink.classList.add('message-user_image');
            this.img.src = 'img/boy.jpg';
            this.textBox.classList.add('message-text');
            this.imgWrap.classList.add('message-user_image--wrap');

            this.imgLink.appendChild(this.img);
            this.imgWrap.appendChild(this.imgLink);
            this.div.appendChild(this.imgWrap);
            this.textBox.innerHTML = this.text;
            this.div.appendChild(this.textBox);

            return this.div;
        }
    }

    function addMessage(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var v = messageInput.value,
                m = new Message(v);

            v !== '' && chatBox.appendChild(m);

            messageInput.value = '';
        }
    }
    !!messageInput && messageInput.addEventListener('keydown', addMessage);

}
window.addEventListener('load', app);