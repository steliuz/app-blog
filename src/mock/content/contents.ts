import type { ThematicType } from '@/interface/content';

import { intercepter, mock } from '../config';

const mockTen: ThematicType[] = [
  {
    thematic: 'Deporte',
    category: [
      {
        name: 'Video',
        date: '2022-01-01',
        count: 400,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
      {
        name: 'Documentos',
        date: '2022-01-01',
        count: 378,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
      {
        name: 'Imagenes',
        date: '2022-01-01',
        count: 2,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
    ],
  },
  {
    thematic: 'Cine',
    category: [
      {
        name: 'Card 1',
        date: '2022-01-01',
        count: 89,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
    ],
  },
  {
    thematic: 'Cocina',
    category: [
      {
        name: 'Card 1',
        date: '2022-01-01',
        count: 203,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
    ],
  },
  {
    thematic: 'Programación',
    category: [
      {
        name: 'Card 1',
        date: '2022-01-01',
        count: 866,
        content: [
          {
            title: 'Video de Ronaldinho',
            description: 'Mundial 2002',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=1',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Maradona',
            description: 'Campeonato 1986',
            type: 'documento',
            url: 'https://www.maradona.com',
            date: '2022-01-01',
          },
          {
            title: 'Biografía de Messi',
            description: 'Todos sus títulos',
            type: 'texto',
            url: 'https://www.messi.com',
            date: '2022-01-01',
          },
          {
            title: 'Historia de Pelé',
            description: 'Campeonato 1958',
            type: 'documento',
            url: 'https://www.pele.com',
            date: '2022-01-01',
          },
        ],
      },
    ],
  },
];

mock.mock('/thematic/all', 'get', intercepter(mockTen));
