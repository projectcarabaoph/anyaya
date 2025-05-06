import { Request, Response } from 'express';
import { SupabaseClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

import { clientKeys } from '@utils/supabase/client-keys';

export function serverClient(
    request: Request,
    response: Response
): SupabaseClient {

    try {
        const { clientUrl, clientAnonKey } = clientKeys();

        if (!clientUrl || !clientAnonKey) throw new Error('Missing client url or client keys');

        const supabase = createServerClient(
            clientUrl, clientAnonKey,
            {
                cookies: {
                    getAll: () => {
                        const cookies = request.cookies || {};
                        return Object.entries(cookies).map(([name, value]) => ({ name, value }));
                    },
                    setAll: (cookiesToSet: Array<{ name: string; value: string; options: Record<string, any> }>) => {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) => {
                                options.sameSite = 'strict';
                                response.cookie(name, value, { ...options });
                            });
                        } catch (error) {
                            console.error('Error setting cookies:', error);
                        }
                    }
                }
            })

        return supabase;

    } catch (error) {
        throw error
    }



}

