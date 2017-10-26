$(document).ready(function(){
  $('.btn').click(function() {
    alert('hi')
  })
  var search = $('#search')
  search.on('keyup', function(e)
  {

    let mykey = config.ID_KEY;
    let secretkey = config.SECRET_KEY;
    let username = e.target.value
    let address = "https://api.github.com/users/"+username
    let repos = address + '/repos'

    // XHR to Github

    $.ajax({
      url: address,
      data: {
        client_id: mykey,
        client_secret: secretkey
      }
    }).done(function(user) {
      $.ajax({
        url: repos,
        data: {
          client_id: mykey,
          client_secret: secretkey,
          sort: 'created: asc',
          per_page: 5
        }

      }).done(function(repos) {
        $.each(repos, function(index, repo) {
            $('#repos').append
            (`
              <section class="well">
                <article class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>

                  <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers : ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                  </div>

                  <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                  </div>
                </article>
              </section>
            `)
        })
      })
        $('#profile').html(`

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
            <div class="col-md-3">
            <img class="thumbnail avatar" src="${user.avatar_url}">
            <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists : ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <ul class="list-group">
                  <li class="list-group-item">
                    Company : ${user.company}
                  </li>
                  <li class="list-group-item">
                  <a href="${user.blog}">Website</a>
                  </li>
                  <li class="list-group-item">
                    Location  : ${user.location}
                  </li>
                  <li class="list-group-item">
                    Member Since: ${user.created_at}
                  </li>
                </ul>
            </div>
            <br><br>

            </div>
            <h3 class="page-header">Latest Repos</h3>
            <article class="repos" id="repos"></article>
          </div>


          `)
        })
    })
  });
