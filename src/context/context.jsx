import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [GithubUser, setGithubUser] = useState(mockUser);
  const [Repos, setRepos] = useState(mockRepos);
  const [Followers, setFollowers] = useState(mockFollowers);
  const [Requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (User) => {
    toggleError();
    setIsLoading(true);
    const Response = await axios(`${rootUrl}/users/${User}`, {
      crossdomain: true,
    }).catch((err) => console.log(err));
    if (Response) {
      setGithubUser(Response.data);
      const { login, followers_url } = Response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, 'There is no user with that username');
    }
    checkRequests();
    setIsLoading(false);
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            'Sorry, You have exceeded your hourly rate limit !',
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };
  useEffect(checkRequests, []);
  useEffect(() => {
    searchGithubUser('apoorvdwi');
    //eslint-disable-next-line
  }, []);
  return (
    <GithubContext.Provider
      value={{
        GithubUser,
        Repos,
        Followers,
        Requests,
        Error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
