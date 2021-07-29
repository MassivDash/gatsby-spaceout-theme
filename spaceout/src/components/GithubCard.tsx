// import React, { useEffect, useState, FC } from 'react';
// import Headings from 'gatsby-theme-spaceout/src/components/Headings';
// import ExternalLink from './ExternalLink';
// import styled from '@emotion/styled';
// import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';

// const pluralizer = (number, string) => {
//   let newString = string.slice();
//   if (number === 0) {
//     newString = `${string}s`;
//   } else if (number > 1) {
//     newString = `${string}s`;
//   }
//   return newString;
// };

// interface User {
//   avatar_url: string;
//   bio: string;
//   blog: string;
//   company: string;
//   created_at: string;
//   email: string;
//   events_url: string;
//   followers: string;
//   followers_url: string;
//   following: string;
//   following_url: string;
//   gists_url: string;
//   gravatar_id: string;
//   hireable: string;
//   html_url: string;
//   id: number;
//   location: string;
//   login: string;
//   name: string;
//   node_id: string;
//   organizations_url: string;
//   public_gists: number;
//   public_repos: number;
//   received_events_url: string;
//   repos_url: string;
//   site_admin: boolean;
//   starred_url: string;
//   subscriptions_url: string;
//   twitter_username: string;
//   type: 'User';
//   updated_at: string;
//   url: string;
// }

// const GitHubStatsCard: FC = () => {
//   const [user, setUser] = useState<User | Record<string, never>>({});
//   const [userRepos, setUserRepos] = useState([]);
//   const [userLanguages, setUserLanguages] = useState({});

//   const username = 'MassivDash';
//   const options = {
//     method: 'GET',
//     headers: {
//       Accept: 'application/vnd.github.v3+json',
//       'user-agent': `${username}`,
//     },
//   };

//   const getUserReposData = () => {
//     fetch(`https://api.github.com/users/${username}/repos`, options)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const languagesObj = {};
//         try {
//           data.forEach((repository) => {
//             if (repository.language && repository.language !== null) {
//               if (languagesObj[repository.language]) {
//                 languagesObj[repository.language] += 1;
//               } else {
//                 languagesObj[repository.language] = 1;
//               }
//             }
//           });
//           return [data, languagesObj];
//         } catch (err) {
//           const error = new Error(err);
//           console.error(error);
//         }
//       })
//       .then((payload) => {
//         try {
//           setUserRepos(payload[0]);
//           setUserLanguages(payload[1]);
//         } catch (err) {
//           const error = new Error(err);
//           console.error(error);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         return err;
//       });
//   };

//   const getUserData = (username) => {
//     const options = {
//       method: 'GET',
//       headers: {
//         Accept: 'application/vnd.github.v3+json',
//         'user-agent': `github-stats-card`,
//       },
//     };

//     fetch(`https://api.github.com/users/${username}`, options)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setUser(data);
//       });
//   };

//   const sortedLanguages = Object.entries(userLanguages).sort((a, b) => {
//     return a[1][1] - b[1][1];
//   });

//   console.log(userRepos);

//   const topLanguages =
//     sortedLanguages.length >= 3 ? sortedLanguages.slice(0, 3) : sortedLanguages;
//   const languagesMarkup = topLanguages.map((language) => (
//     <li key={language[0]}>
//       <b>{language[0]}</b>
//       <small>
//         {language[1]} {pluralizer(parseInt(language[1]), 'repo')}
//       </small>
//     </li>
//   ));
//   const watchersCount = userRepos.reduce((acc, r) => acc + r.watchers_count, 0);
//   const stargazersCount = userRepos.reduce(
//     (acc, r) => acc + r.stargazers_count,
//     0,
//   );
//   const openIssuesCount = userRepos.reduce(
//     (acc, r) => acc + r.open_issues_count,
//     0,
//   );
//   const stargazers = (
//     <li>
//       Starred <b>{stargazersCount}</b>{' '}
//       {pluralizer(parseInt(stargazersCount), `time`)}
//     </li>
//   );
//   const watchers = (
//     <li>
//       <b>{watchersCount}</b> {pluralizer(parseInt(watchersCount), `watcher`)}
//     </li>
//   );
//   const followers = (
//     <li>
//       Followed by <b>{user.followers}</b>{' '}
//       {pluralizer(parseInt(user.followers), `member`)}
//     </li>
//   );
//   const following = (
//     <li>
//       Following <b>{user.following}</b>{' '}
//       {pluralizer(parseInt(user.following), `member`)}
//     </li>
//   );
//   const openIssues = (
//     <li>
//       <b>{openIssuesCount}</b>&nbsp;
//       {pluralizer(parseInt(openIssuesCount), `open issue`)}
//     </li>
//   );
//   const company = !user.company ? `` : <p>Currently at {user.company}</p>;
//   const profileLink = (
//     <p>
//       <a href={user.html_url} target="_blank" rel="noreferrer nofollow">
//         @{user.login} on GitHub
//       </a>
//     </p>
//   );

//   const createdAt = new Date(user.created_at);
//   const relativeDate = Date.now() - createdAt;
//   const totalYears = Math.round(relativeDate / 1000 / 60 / 60 / 24 / 365);
//   const yearsOnGitHub = (
//     <p>
//       {totalYears} {pluralizer(totalYears, 'Year')} of Membership
//     </p>
//   );
//   const footer = (
//     <div>
//       <section>
//         {profileLink}
//         {yearsOnGitHub}
//         {company}
//       </section>
//     </div>
//   );

//   useEffect(() => {
//     if (Object.keys(user).length === 0) {
//       getUserData(username);
//     }

//     if (userRepos.length === 0 || Object.keys(userLanguages.length === 0)) {
//       getUserReposData();
//     }
//   }, []);

//   return (
//     <div>
//       <Headings.H3>
//         <ExternalLink
//           href={user.html_url}
//           target="_blank"
//           rel="noopener nofollow noreferrer"
//         >
//           @{username}
//         </ExternalLink>
//         &nbsp;on GitHub
//       </Headings.H3>
//       <GithubImage src={user.avatar_url} alt={user.name} />

//       {user && user.bio ? <h4>{user.bio}</h4> : ``}
//       <h5>
//         <span>
//           <b>{user.public_repos}</b>Public Repos
//         </span>
//         <span>|</span>
//         <span>
//           <b>{user.public_gists}</b>Public Gists
//         </span>
//       </h5>
//       <div>
//         <p>
//           <b>Top Languages</b>
//         </p>
//         <ol>{languagesMarkup}</ol>
//         <ul>
//           {openIssues}
//           {watchers}
//           {stargazers}
//           {followers}
//           {following}
//         </ul>
//       </div>
//       {footer}
//     </div>
//   );
// };

// export default GitHubStatsCard;

// const GithubImage = styled.img`
//   box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
//   display: inline-block;
//   flex-shrink: 0;
//   line-height: 1;
//   overflow: hidden;
//   vertical-align: middle;
//   border-radius: 50%;
//   max-width: 100px;
// `;
