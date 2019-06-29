const SONGS_LIST = [{
    id: 1,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 2,
    title: "bad guy",
    genre: "Pop",
    thumbnail: "https://consequenceofsound.net/wp-content/uploads/2019/03/when-we-all-fall-asleep-new-album-release-stream-billie.jpg?quality=80&w=380&h=380&crop=1",
    album: "Album",
    artist: "Billie Eilish",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20412149/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wWG9PYmtZLzFuTFRWR0tnWStLMlR3UEFwcmF1dXQ5emRyTjROTUphc1pjTUh1VExxVTBDVFlMZlJXcGk0aGVHMGliRWFaMmFvUzJWK3FxRWxSWXhEc2Y/Billie_Eilish_bad_guy_(music2k.com).mp3"
}, {
    id: 3,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 4,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 5,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 6,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 7,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}, {
    id: 8,
    title: "God's Plan",
    genre: "Pop",
    thumbnail: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/15/f1/bf/15f1bf30-54b7-e4a1-1a84-02cdc3b1fc2b/source/512x512bb.jpg",
    album: "Album",
    artist: "Drake ft. Someone",
    duration: "2:34",
    location: "https://cs1.music2k.com/download/20268539/V3RjbnExRWpPeTg5bnJ2L1pncHpEK0xPNlF3dklpeVYrRTA4OW5RSG5wVlV6Q25KeCs2MGowVnd3UHI1djkySldCOFJnRTBqd1NuTVpNVFNmdElGM0U1VjBCWjR3bktRS2RIaVVKYUNiaUJRNEs3bU5CeDNSeElQSktFcTVDTjA/Drake_Gods_Plan_(music2k.com).mp3"
}];

export default SONGS_LIST;