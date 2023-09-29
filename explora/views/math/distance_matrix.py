import pandas as pd
from scipy.spatial.distance import squareform, pdist

def matrice_distance():
    df = pd.read_csv('media/matrice.csv', delimiter=';', encoding="utf-8")
    matrice = pd.DataFrame(squareform(pdist(df.iloc[:, 1:])), columns=df.idx.unique(), index=df.idx.unique())
    matrice.to_csv('media/matrice_distances.csv')
    return matrice


def transformer_liste_en_vecteur():
    df_ecran = pd.read_csv('C:/Users/nabil/OneDrive/Documents/BDF/liste_ecrans.csv', delimiter=';', encoding='ansi')
    liste_ecrans = df_ecran.values.tolist()
    df_composant = pd.read_csv('C:/Users/nabil/OneDrive/Documents/BDF/liste_composants.csv', delimiter=';', encoding='ansi')
    liste_composants = df_composant.values.tolist()
    df_ecran_composant =  pd.read_csv('C:/Users/nabil/OneDrive/Documents/BDF/liste_ecrans_composants.csv', delimiter=';', encoding='ansi')
    vecteur_ecrans=[]
    for ecran in liste_ecrans:
        df = pd.DataFrame(df_ecran_composant[df_ecran_composant['ecran'] == ecran[0]], columns =['composant'])
        liste_composant_ecran = df.values.tolist()
        vecteur=[]
        for composant in liste_composants:
            if (composant in liste_composant_ecran):
                vecteur.append(1)
            else:
                vecteur.append(0)
        vecteur_ecrans.append(vecteur)
    return vecteur_ecrans

# print(len(transformer_liste_en_vecteur()))