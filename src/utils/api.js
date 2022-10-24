import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const getStory = async (id) => {
  try {
    const story = await axios.get(`${API_URL}/item/${id}.json`);
    return story.data;
  } catch (e) {
    console.error(e);
  }
};

export const getNewStories = async (startFrom, end) => {
  try {
    const storiesIds = await axios.get(
      `${API_URL}newstories.json?print=pretty`
    );
    const stories = await Promise.all(
      storiesIds.data.slice(startFrom, end).map(getStory)
    );
    return stories;
  } catch (e) {
    console.error(e);
  }
};
