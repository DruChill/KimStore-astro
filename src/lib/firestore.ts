import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export interface CreativeTool {
  id: string;
  name: string;
  price: number;
  description: string;
  ico: string;
  linkPayment?: string;
  status?: string;
  tags?: string[];
  videoId?: string;
  lastUpdated?: Date; // Ya convertido de Timestamp a Date
  videoUrl?: string;
}

/**
 * Convierte un Timestamp de Firestore a Date
 */
function convertTimestamp(timestamp: Timestamp | Date | string | undefined): Date | undefined {
  if (!timestamp) return undefined;
  
  // Si es un Timestamp de Firestore
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  
  // Si ya es un Date
  if (timestamp instanceof Date) {
    return timestamp;
  }
  
  // Si es un string, intentar parsearlo
  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? undefined : date;
  }
  
  return undefined;
}

/**
 * Obtiene todas las herramientas creativas de Firestore
 */
export async function getCreativeTools(): Promise<CreativeTool[]> {
  try {
    const toolsCollection = collection(db, "creative-tools");
    const querySnapshot = await getDocs(toolsCollection);
    
    const tools: CreativeTool[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tools.push({
        id: doc.id,
        ...data,
        lastUpdated: convertTimestamp(data.lastUpdated)
      } as CreativeTool);
    });
    
    return tools;
  } catch (error) {
    console.error("Error obteniendo herramientas creativas:", error);
    return [];
  }
}

/**
 * Obtiene una herramienta específica por ID
 */
export async function getToolById(id: string): Promise<CreativeTool | null> {
  try {
    const toolsCollection = collection(db, "creative-tools");
    const querySnapshot = await getDocs(toolsCollection);
    
    const doc = querySnapshot.docs.find(doc => doc.id === id);
    
    if (doc) {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastUpdated: convertTimestamp(data.lastUpdated)
      } as CreativeTool;
    }
    
    return null;
  } catch (error) {
    console.error("Error obteniendo herramienta:", error);
    return null;
  }
}

/**
 * Obtiene una herramienta específica por nombre
 */
export async function getToolByName(name: string): Promise<CreativeTool | null> {
  try {
    const toolsCollection = collection(db, "creative-tools");
    const q = query(toolsCollection, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        lastUpdated: convertTimestamp(data.lastUpdated)
      } as CreativeTool;
    }
    
    return null;
  } catch (error) {
    console.error("Error obteniendo herramienta:", error);
    return null;
  }
}
