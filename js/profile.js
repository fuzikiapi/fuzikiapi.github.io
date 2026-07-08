
/* ==========================================================
   KF Platform
   Profile
   ========================================================== */

(() => {
    "use strict";

    let avatar;
    let name;
    let tagline;

    let github;
    let instagram;
    let discord;
    let riot;
    let youtube;
    let spotify;

    function init() {

        cache();

        load();

    }

    function cache() {

        avatar =
            document.getElementById(
                "profileAvatar"
            );

        name =
            document.getElementById(
                "profileName"
            );

        tagline =
            document.getElementById(
                "profileTagline"
            );

        github =
            document.getElementById(
                "githubLink"
            );

        instagram =
            document.getElementById(
                "instagramLink"
            );

        discord =
            document.getElementById(
                "discordLink"
            );

        riot =
            document.getElementById(
                "riotLink"
            );

        youtube =
            document.getElementById(
                "youtubeLink"
            );

        spotify =
            document.getElementById(
                "spotifyLink"
            );

    }

    function load() {

        if (!window.CONFIG) return;

        name.textContent =
            CONFIG.profile.name;

        tagline.textContent =
            CONFIG.profile.tagline;

        avatar.src =
            CONFIG.profile.avatar;

        github.href =
            CONFIG.socials.github;

        instagram.href =
            CONFIG.socials.instagram;

        discord.href =
            CONFIG.socials.discord;

        riot.href =
            CONFIG.socials.riot;

        youtube.href =
            CONFIG.socials.youtube;

        spotify.href =
            CONFIG.socials.spotify;

    }

    KF.Profile = {

        init

    };

})();
