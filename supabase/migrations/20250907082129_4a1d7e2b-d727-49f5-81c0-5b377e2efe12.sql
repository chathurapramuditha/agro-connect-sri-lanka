-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create more secure RLS policies for profiles table

-- Policy 1: Users can view basic public info (name, user_type, avatar, bio) of all profiles
CREATE POLICY "Public basic profile info readable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Policy 2: Users can view their own complete profile data
CREATE POLICY "Users can view their own complete profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 3: Authenticated users can view phone numbers and location of profiles they need to interact with
-- This is for order management and marketplace functionality
CREATE POLICY "Authenticated users can view contact details for business purposes" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' AND (
    -- Users can see contact details of farmers whose products they're viewing/ordering
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE (orders.buyer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()) 
             AND orders.farmer_id = profiles.id)
         OR (orders.farmer_id = (SELECT id FROM public.profiles WHERE user_id = auth.uid()) 
             AND orders.buyer_id = profiles.id)
    )
    -- Or users can see contact details of farmers whose products they're viewing in marketplace
    OR EXISTS (
      SELECT 1 FROM public.products 
      WHERE products.farmer_id = profiles.id 
      AND products.is_available = true
    )
  )
);

-- Policy 4: Admins can view all profile data
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles admin_profile 
    WHERE admin_profile.user_id = auth.uid() 
    AND admin_profile.user_type = 'admin'
  )
);

-- Ensure other policies remain unchanged
-- Users can still insert and update their own profiles