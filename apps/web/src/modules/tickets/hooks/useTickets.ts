'use client';

import { useQuery } from '@tanstack/react-query';

export function useTickets(divisionId?: string) {
  return useQuery({
    queryKey: ['tickets', divisionId],
    queryFn: async () => {
      // fetch tickets dari endpoint atau server action
      return [];
    },
  });
}
