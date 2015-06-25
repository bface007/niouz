/**
 * Created by bface on 21/06/2015.
 */

module.exports = {
    http_port: process.env.PORT || 3000,
    https_port: process.env.HTTPS_PORT || 3001,
    secret: '98thatisasecret98',
    database_uri: 'mongodb://localhost:27017/niouz',
    slugify: function(text){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')               // Replace spaces with -
            .replace(/[^\w\-]/g, '')            // Remove all non-word chars
            .replace(/\-\-+/g, '-')             // Replace multiple - with single -
            .replace(/^-+/, '')                 // Trim - from start of the text
            .replace(/-+$/, '');                // Trim - from end of the text
    },
    wordsInArray: function (content) {
        try{
            if(typeof content !== "string")
                throw "first parameter must be a string";
        } catch(err){
            console.error("Error : "+ err);
        }
        if(content === undefined)
            return;

        return content.trim().replace(/\s+/gi, ' ').split(' ');
    },
    implode: function (glue, pieces) {
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Waldo Malqui Silva
        // improved by: Itsacon (http://www.itsacon.net/)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
        //   returns 1: 'Kevin van Zonneveld'
        //   example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
        //   returns 2: 'Kevin van Zonneveld'

        var i = '',
            retVal = '',
            tGlue = '';
        if (arguments.length === 1) {
            pieces = glue;
            glue = '';
        }
        if (typeof pieces === 'object') {
            if (Object.prototype.toString.call(pieces) === '[object Array]') {
                return pieces.join(glue);
            }
            for (i in pieces) {
                retVal += tGlue + pieces[i];
                tGlue = glue;
            }
            return retVal;
        }
        return pieces;
    },
    makeExcerpt: function (text, wordLength) {
        if(wordLength === undefined || typeof wordLength !== "number")
            wordLength = 55;

        var more = "";

        var wordArray = this.wordsInArray(text);

        if(wordArray.length > wordLength){
            wordArray = wordArray.slice(0, wordLength);
            more = "...";
        }

        return this.implode(" ", wordArray) + more;
    },
    strip_tags: function strip_tags(input, allowed) {
        //  discuss at: http://phpjs.org/functions/strip_tags/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Luke Godfrey
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: Pul
        //    input by: Alex
        //    input by: Marc Palau
        //    input by: Brett Zamir (http://brett-zamir.me)
        //    input by: Bobby Drake
        //    input by: Evertjan Garretsen
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Onno Marsman
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Eric Nagel
        // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: Tomasz Wesolowski
        //  revised by: Rafał Kukawski (http://blog.kukawski.pl/)
        //   example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
        //   returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
        //   example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
        //   returns 2: '<p>Kevin van Zonneveld</p>'
        //   example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
        //   returns 3: "<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>"
        //   example 4: strip_tags('1 < 5 5 > 1');
        //   returns 4: '1 < 5 5 > 1'
        //   example 5: strip_tags('1 <br/> 1');
        //   returns 5: '1  1'
        //   example 6: strip_tags('1 <br/> 1', '<br>');
        //   returns 6: '1 <br/> 1'
        //   example 7: strip_tags('1 <br/> 1', '<br><br/>');
        //   returns 7: '1 <br/> 1'

        allowed = (((allowed || '') + '')
            .toLowerCase()
            .match(/<[a-z][a-z0-9]*>/g) || [])
            .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '')
            .replace(tags, function($0, $1) {
                return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
    },

    posts: {
        status: [ 'publish', 'auto-draft', 'draft', 'future', 'pending', 'private', 'trash'],
        comment_status: [ 'open', 'closed'],
        types: ['standard', 'audio', 'video', 'gallery']
    },
    users: {
        status: [ 'activated', 'pending', 'waiting_for_activation', 'reported', 'banished'],
        roles: [ 'user', 'moderator', 'admin']
    },
    blacklist: {
        status: [ 'activated', 'pending']
    },
    comments: {
        status: [ 'activated', 'pending', 'waiting_for_activation', 'reported', 'banished']
    },
    reports: {
        status: [ 'pending', 'activated', 'rejected'],
        types: [ 'post', 'user', 'media', 'group']
    },
    ads: {
        types: []
    },
    groups: {
        status: [ 'active', 'pending', 'waiting_for_activation'],
        types: [ 'public', 'private', 'closed']
    },
    groupmembers: {
        roles: [ 'user', 'moderator', 'admin'],
        status: [ 'new', 'older']
    }
};
