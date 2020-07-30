@extends('layout')
@section('styles')
@parent
<link href="{{ asset('/resources/assets/css/blog.css') }}" rel="stylesheet"/>

@endsection
@section('title')
{{$blog->title}}
@endsection
@section('fb-meta')
    <meta property="og:type" content="article">
    <meta property="og:title" content="{{$blog->title}}"/>
    <meta property="og:description" content="{{$blog->abstract}}"/>
    <meta property="og:image" content="{{asset('/resources/assets/images/taho.jpg')}}" />
    <meta property="og:url" content="{{url('/')}}/blogit/{{ $blog->entry }}"/>


@endsection
@section('content')


    <header>
        <h1 class="remove-margin-bottom">{{$blog->title}}</h1>
        <div class="sub-header">
            <img class="img-small" class="mr-1" src="{{asset('/resources/assets/images/taho.jpg')}}"/>
            <small>Kirjoittanut Toni Aho <br/>{{$blog->parsed_date}}<br/>
                <a href="{{url('/')}}/blogit/{{ $blog->entry }}#disqus_thread" data-disqus-identifier="blog-{{$blog->id}}"></a>
            </small>
        </div>
        <!-- Your share button code -->
        <div class="social">
            <div class="fb-share-button"
                 data-href="{{url('/')}}/blogit/{{ $blog->entry }}"
                 data-size="large"
                 data-layout="icon_link">
            </div>
        </div>

    </header>

    <article class="blog-content">
        <section class="blog-abstract">
            <p><strong><em>{!! $blog->abstract !!}</em></strong></p>
        </section>
        <section class="blog-article">
            <?php include  base_path('/resources/blogs/' .$blog->entry.'.html'); ?>
        </section>
    </article>
    <div class="disqus-content">
        <div id="disqus_thread"></div>
        <script>
            /**
             *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
             *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
             **/
            var disqus_config = function () {
                this.language = 'fi';
                this.page.url = '{{url('/')}}/blogit/{{ $blog->entry }}';  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = 'blog-{{ $blog->id }}';  // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
            (function () { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://taho-ohjelmistopalvelut.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

    </div>

@endsection
@section('endbody')
    <script id="dsq-count-scr" src="//taho-ohjelmistopalvelut.disqus.com/count.js" async></script>
<!-- Load Facebook SDK for JavaScript -->
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>
@endsection
