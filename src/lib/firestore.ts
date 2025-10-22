import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export interface CreativeTool {
  id: string;
  name: string;
  price: number;
  description: string;
  ico: string;
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
      tools.push({
        id: doc.id,
        ...doc.data()
      } as CreativeTool);
    });
    
    return tools;
  } catch (error) {
    console.error("Error obteniendo herramientas creativas:", error);
    return [];
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
      return {
        id: doc.id,
        ...doc.data()
      } as CreativeTool;
    }
    
    return null;
  } catch (error) {
    console.error("Error obteniendo herramienta:", error);
    return null;
  }
}
