import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEventList = async (req, res) => {
  const { page } = req.query;
  const limit = 15;

  try {
    const events = await prisma.event.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!events?.length) {
      return res.status(400).json({ message: 'No event found' });
    }

    const total = await prisma.event.count();

    const totalPages = total <= limit ? 1 : Math.ceil(total / limit);
    const result = {
      events,
      totalPages,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const getEvents = async (req, res) => {
  const { limit, lastCursor, category } = req.query;

  try {
    const result = await prisma.event.findMany({
      take: limit ? parseInt(limit) : 12,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      where: {
        category: category ? category : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (result.length == 0) {
      return res
        .json({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        })
        .status(200);
    }

    const lastPostInResults: any = result[result.length - 1];
    const cursor: any = lastPostInResults.id;

    const nextPage = await prisma.event.findMany({
      // Same as before, limit the number of events returned by this query.
      take: limit ? parseInt(limit as string) : 10,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
      where: {
        category: category ? category : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getEventDetail = async (req, res) => {
  try {
    const post = await prisma.event.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createEvent = async (req, res) => {
  try {
    const newPost = req.body;
    const savedPost = await prisma.event.create({
      data: newPost,
    });
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const editEvent = async (req, res) => {
  const eventId = req.params.id;
  const payload = req.body;
  try {
    const updatedNews = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: payload,
    });

    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

export const updateEventStatus = async (req, res) => {
  const eventId = req.params.id;
  const status = req.body.status;

  try {
    const updatedNews = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: { status },
    });

    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update event status' });
  }
};

export const deleteSingleEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedNews = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    res.status(200).json('Event has been deleted!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
