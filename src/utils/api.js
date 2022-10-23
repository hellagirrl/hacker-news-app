import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_API_URL;

const getStory = async (id) => {
  try {
    const story = await axios.get(`${API_URL}/item/${id}.json`);
    return story.data;
  } catch (error) {
    console.error(e);
  }
};

export const getNewStories = async (count) => {
  try {
    const storiesIds = await axios.get(
      `${API_URL}newstories.json?print=pretty`
    );
    const stories = await Promise.all(
      storiesIds.data.slice(0, count).map(getStory)
    );
    console.log(count, 'count');
    return stories;
  } catch (e) {
    console.error(e);
  }
};
