import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_API_URL;

const getStory = async (id) => {
  try {
    const story = await axios.get(`${API_URL}/item/${id}.json`);
    return story;
  } catch (error) {
    console.log('Error while getting a story.');
  }
};

export const getNewStories = async () => {
  try {
    const storiesIds = await axios.get(
      `${API_URL}newstories.json?print=pretty`
    );
    const stories = await Promise.all(storiesIds.slice(0, 100).map(getStory));
    return stories;
  } catch (e) {
    console.log('Error while getting stories.');
  }
};
