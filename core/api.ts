import { Job } from './interfaces'
import { supabase } from './supabase'


export async function addJob(job: Omit<Job, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('Job')
    .insert([job])
    .select()

  if (error) throw error
  return data?.[0]
}

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('Job')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Job[]
}

export async function updateJob(id: number, updates: Partial<Job>) {
  const { data, error } = await supabase
    .from('Job')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data?.[0]
}


export async function deleteJob(id: number) {
  const { error } = await supabase
    .from('Job')
    .delete()
    .eq('id', id)

  if (error) throw error
}
