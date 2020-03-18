 l would like to use this new representation of images (features extracted from k-means algorithm) as SVM classifier inputs. How can l do that ?

Here is my code:

EDIT1:
package update

```Python
from sklearn import mixture
gmm = mixture.GMM(n_components=6).fit(X)
```

Now l would like run k-means with different k=range(50,500), how can l get the distances for each k ? Is is correct to do the following :

```Python
K=range(50,500)
KM=[KMeans(n_clusters=k).fit(X) for k in K]
distances = [np.column_stack([np.sum((X - center)**2, axis=1)**0.5 for center in C.cluster_centers_]) for C in KM]
```

 Prediction of k-means algorithm for each observation is just the corresponding centroid. So you can take vector of predicted centroids and use it as a categorical feature (maybe one-hot encoded).

But it is just one feature. With little coding you can do better. For example, you can find for each sample its distance to each of k cluster center, and so create k new features. A Python example:

```Python
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.svm import SVC
import numpy as np
iris =  load_iris()
X = iris['data']
y = iris['target']
kmeans = KMeans(n_clusters=6).fit(X)
distances = np.column_stack([np.sum((X - center)**2, axis=1)**0.5 for center in kmeans.cluster_centers_])
svm = SVC().fit(distances, y)
```
Another (and maybe simpler way) is to fit a gaussian mixture model (e.g. by scikit-learn). It is similar to k-means, but for each observation produces a probability distribution over clusters, instead of a single cluster label. These vectors of predicted cluster probabilities may be used as features as well.

```Python
from sklearn.mixture import GaussianMixture
gmm = GaussianMixture(n_components=6).fit(X)
proba = gmm.predict_proba(X)
svm2 = SVC().fit(proba, y)
```
