-- ============================================================
-- SEED : 3 articles de départ (anciens fichiers MDX)
-- À exécuter dans : Supabase Dashboard > SQL Editor
-- ============================================================

INSERT INTO articles (title, slug, excerpt, content, category, image_url, read_time, published, published_at)
VALUES (

-- ── Article 1 : Protection solaire ──────────────────────────
$a1_title$Comment bien choisir sa crème solaire ?$a1_title$,
'protection-solaire',
$a1_exc$SPF 30, SPF 50, minéral, chimique… comment s'y retrouver ? Nos pharmaciens vous guident pour choisir la protection solaire adaptée à votre peau et à votre activité.$a1_exc$,
$a1_body$<p>Le soleil est source de vie, mais aussi de dommages cutanés importants si l'on ne se protège pas correctement. Chaque année, nos pharmaciens répondent aux mêmes questions lors des mois d'été. Voici un guide complet pour choisir votre crème solaire.</p>

<h2>Comprendre l'indice SPF</h2>
<p>Le SPF (Sun Protection Factor) mesure le niveau de protection contre les rayons UVB, responsables des coups de soleil. Il ne mesure <strong>pas</strong> la durée de protection, comme on l'entend souvent.</p>
<ul>
  <li><strong>SPF 30</strong> : filtre environ 97 % des UVB</li>
  <li><strong>SPF 50</strong> : filtre environ 98 % des UVB</li>
  <li><strong>SPF 50+</strong> : filtre plus de 99 % des UVB</li>
</ul>
<p>La différence entre SPF 30 et SPF 50 est faible, mais elle compte pour les peaux sensibles, les enfants ou en haute montagne.</p>

<h2>Rayons UVA et UVB : quelle différence ?</h2>
<p>Les <strong>UVB</strong> provoquent les coups de soleil et participent au cancer de la peau. Les <strong>UVA</strong> pénètrent plus profondément et accélèrent le vieillissement cutané. Ils peuvent aussi provoquer des allergies solaires.</p>
<p>Un bon écran solaire protège contre <strong>les deux types de rayons</strong>. Vérifiez la mention « Protection large spectre » ou le logo UVA encerclé sur l'emballage.</p>

<h2>Filtre chimique ou filtre minéral ?</h2>
<h3>Filtres chimiques (organiques)</h3>
<p>Absorbent les UV et les transforment en chaleur. Texture légère, idéale pour le quotidien. Moins de traces blanches. À appliquer 20 minutes avant l'exposition.</p>
<h3>Filtres minéraux (physiques)</h3>
<p>À base d'oxyde de zinc et/ou de dioxyde de titane. Forment un écran réflecteur sur la peau. Recommandés pour les <strong>peaux sensibles</strong>, les <strong>bébés</strong> et les <strong>peaux à tendance acnéique</strong>. Peuvent laisser un léger voile blanc.</p>

<h2>Comment choisir selon votre phototype ?</h2>
<table>
  <thead><tr><th>Phototype</th><th>Caractéristiques</th><th>SPF recommandé</th></tr></thead>
  <tbody>
    <tr><td>I – II</td><td>Peau très claire, taches de rousseur</td><td>SPF 50+</td></tr>
    <tr><td>III</td><td>Peau claire, teint mat</td><td>SPF 50</td></tr>
    <tr><td>IV – V</td><td>Peau mate à foncée</td><td>SPF 30 minimum</td></tr>
    <tr><td>VI</td><td>Peau très foncée</td><td>SPF 30</td></tr>
  </tbody>
</table>

<h2>Conseils pratiques de votre pharmacien</h2>
<ul>
  <li><strong>Appliquez généreusement</strong> : la dose recommandée est de 2 mg/cm². En pratique, cela correspond à une cuillère à café pour le visage seul.</li>
  <li><strong>Renouvelez toutes les 2 heures</strong>, après chaque baignade ou transpiration abondante.</li>
  <li><strong>N'oubliez pas les zones oubliées</strong> : nuque, oreilles, dessus des pieds, lèvres.</li>
  <li><strong>Les enfants de moins de 3 ans</strong> ne doivent pas être exposés au soleil direct.</li>
</ul>

<h2>Les marques que nous recommandons</h2>
<p>Chez Pharmacie Quartier des Hôpitaux, nous proposons une sélection rigoureuse de protections solaires :</p>
<ul>
  <li><strong>La Roche-Posay Anthelios</strong> : référence pour peaux sensibles</li>
  <li><strong>Vichy Capital Soleil</strong> : formules très complètes</li>
  <li><strong>CeraVe Mineral Sunscreen</strong> : filtres minéraux doux</li>
  <li><strong>Avène Sun</strong> : idéale pour peaux réactives</li>
  <li><strong>Eucerin Sun</strong> : pour peaux sèches et matures</li>
</ul>
<p>Votre peau est unique. N'hésitez pas à venir nous demander conseil pour trouver la protection adaptée à votre type de peau et à vos activités estivales.</p>$a1_body$,
'Bien-être',
'/images/articles/protection-solaire.webp',
'5 min de lecture',
true,
'2024-06-10 00:00:00+00'

),
(

-- ── Article 2 : Vaccins ──────────────────────────────────────
'Êtes-vous à jour de vos vaccins ?',
'vaccins-rappel',
$a2_exc$Tétanos, hépatite B, grippe, pneumocoque… de nombreux adultes ne sont plus à jour de leurs vaccinations sans le savoir. Faites le point avec notre guide.$a2_exc$,
$a2_body$<p>La vaccination est l'un des outils les plus puissants de la médecine préventive. Pourtant, à l'âge adulte, nous avons tendance à oublier les rappels. Voici un point complet pour savoir si votre carnet de vaccination est à jour.</p>

<h2>Pourquoi les rappels sont-ils importants ?</h2>
<p>L'immunité conférée par un vaccin ne dure pas toujours toute la vie. Certains vaccins nécessitent des rappels réguliers pour maintenir une protection efficace. De plus, de nouveaux vaccins ont été introduits ces dernières années, et certaines personnes n'ont pas été vaccinées dans l'enfance.</p>

<h2>Les vaccins essentiels pour les adultes</h2>

<h3>Tétanos – Diphtérie – Coqueluche (Td-Ca)</h3>
<p><strong>Rappel tous les 10 ans</strong> pour les adultes. Le tétanos est encore présent au Maroc et peut être contracté via une blessure. La coqueluche est en recrudescence et particulièrement dangereuse pour les nourrissons.</p>

<h3>Hépatite B</h3>
<p>Si vous n'avez pas été vacciné dans l'enfance, un schéma de 3 doses est recommandé. Particulièrement important pour le personnel de santé et les personnes à risque.</p>

<h3>Grippe saisonnière</h3>
<p><strong>Chaque automne</strong>, surtout pour :</p>
<ul>
  <li>Les personnes de plus de 65 ans</li>
  <li>Les personnes atteintes de maladies chroniques (diabète, asthme, maladies cardiaques)</li>
  <li>Les femmes enceintes</li>
  <li>Les professionnels de santé</li>
</ul>

<h3>Pneumocoque</h3>
<p>Recommandé pour les adultes de plus de 65 ans et les personnes immunodéprimées. Protège contre les pneumonies bactériennes graves.</p>

<h3>Covid-19</h3>
<p>Le calendrier vaccinal évolue. Renseignez-vous auprès de votre médecin ou de notre équipe pour connaître les recommandations actuelles.</p>

<h2>Vaccins pour les voyageurs</h2>
<p>Si vous prévoyez un voyage hors du Maroc, certains vaccins peuvent être nécessaires ou recommandés selon la destination :</p>
<ul>
  <li><strong>Fièvre typhoïde</strong> : Afrique subsaharienne, Asie du Sud</li>
  <li><strong>Hépatite A</strong> : zones à hygiène précaire</li>
  <li><strong>Méningite</strong> : ceinture africaine de la méningite</li>
  <li><strong>Rage</strong> : séjour en zone rurale en Asie ou Afrique</li>
  <li><strong>Fièvre jaune</strong> : Afrique équatoriale, Amérique du Sud (certificat obligatoire)</li>
</ul>
<p><strong>Idéalement, consultez 6 à 8 semaines avant votre départ</strong> pour avoir le temps de compléter les schémas vaccinaux.</p>

<h2>Comment savoir si vous êtes à jour ?</h2>
<ol>
  <li><strong>Retrouvez votre carnet de santé</strong> : il devrait comporter les dates de vos vaccinations.</li>
  <li><strong>Consultez votre médecin</strong> : il peut vérifier votre statut immunitaire et prescrire les vaccins manquants.</li>
  <li><strong>Venez nous voir</strong> : notre équipe peut vous aider à faire le point et à vous orienter.</li>
</ol>

<h2>Mythes et réalités sur la vaccination</h2>
<p><strong>« Je ne me souviens pas d'avoir été vacciné, donc je ne l'ai pas été. »</strong><br>→ Faux. Votre médecin peut faire une sérologie (prise de sang) pour vérifier votre immunité contre certaines maladies.</p>
<p><strong>« Les vaccins sont réservés aux enfants. »</strong><br>→ Faux. De nombreux vaccins sont recommandés à l'âge adulte, avec des rappels réguliers.</p>
<p><strong>« Je suis en bonne santé, je n'ai pas besoin de me vacciner. »</strong><br>→ La vaccination protège aussi les personnes autour de vous qui, elles, sont vulnérables (nourrissons, personnes immunodéprimées, personnes âgées).</p>
<p>N'attendez pas d'être malade pour penser à votre prévention. Passez nous voir à la pharmacie, nous pouvons consulter votre carnet de santé et vous orienter vers votre médecin pour effectuer les vaccins nécessaires.</p>$a2_body$,
'Prévention',
'/images/articles/vaccins-rappel.webp',
'6 min de lecture',
true,
'2024-05-15 00:00:00+00'

),
(

-- ── Article 3 : Ménopause naturelle ─────────────────────────
$a3_title$Ménopause : les alternatives naturelles aux traitements hormonaux$a3_title$,
'menopause-naturelle',
$a3_exc$Bouffées de chaleur, troubles du sommeil, irritabilité… la ménopause impacte le quotidien de millions de femmes. Découvrez les approches naturelles qui peuvent soulager ces symptômes.$a3_exc$,
$a3_body$<p>La ménopause est une étape naturelle de la vie de chaque femme, généralement entre 45 et 55 ans. Si le traitement hormonal de substitution (THS) reste la référence médicale pour les symptômes sévères, de nombreuses femmes cherchent des alternatives naturelles. Voici ce que la phytothérapie et les micronutriments peuvent vous apporter.</p>

<h2>Les symptômes courants de la ménopause</h2>
<p>La chute du taux d'œstrogènes entraîne une variété de symptômes qui impactent la qualité de vie :</p>
<ul>
  <li><strong>Bouffées de chaleur</strong> : le symptôme le plus fréquent, touchant 75 % des femmes</li>
  <li><strong>Troubles du sommeil</strong> : insomnies, réveils nocturnes</li>
  <li><strong>Sécheresse vaginale</strong> et inconfort lors des rapports</li>
  <li><strong>Sautes d'humeur</strong>, irritabilité, anxiété</li>
  <li><strong>Prise de poids</strong>, surtout abdominale</li>
  <li><strong>Perte de densité osseuse</strong> (ostéoporose à surveiller)</li>
</ul>

<h2>Les plantes à action œstrogénique naturelle</h2>

<h3>Le trèfle rouge (<em>Trifolium pratense</em>)</h3>
<p>Riche en isoflavones, il imite l'action des œstrogènes sur certains récepteurs. Des études cliniques montrent une réduction significative des bouffées de chaleur. Disponible en comprimés standardisés.</p>

<h3>Le soja et ses isoflavones</h3>
<p>Les populations asiatiques, grandes consommatrices de soja, présentent moins de bouffées de chaleur. Les isoflavones de soja (génistéine, daidzéine) ont un effet modulateur doux sur les récepteurs œstrogéniques.</p>
<p><strong>Important</strong> : les phyto-œstrogènes sont contre-indiqués en cas d'antécédent de cancer hormono-dépendant (sein, endomètre). Consultez votre médecin avant toute supplémentation.</p>

<h3>L'actée à grappes noires (<em>Actaea racemosa</em>)</h3>
<p>Plante nord-américaine utilisée depuis des siècles par les femmes Amérindiennes. Reconnue par l'OMS pour le traitement des troubles climatériques. Agit sur les bouffées de chaleur et les troubles de l'humeur sans effet hormonal direct.</p>

<h3>La sauge officinale (<em>Salvia officinalis</em>)</h3>
<p>Traditionnellement utilisée contre les sueurs nocturnes et les bouffées de chaleur. La sauge a une action antiperspirant et modulatrice. À prendre sous forme de tisane ou d'extrait sec.</p>

<h2>Les micronutriments essentiels à la ménopause</h2>

<h3>Calcium et Vitamine D</h3>
<p>La ménopause accélère la perte osseuse. Un apport suffisant en <strong>calcium</strong> (1 000 à 1 200 mg/jour) et en <strong>vitamine D</strong> (800 à 1 000 UI/jour) est indispensable pour prévenir l'ostéoporose.</p>

<h3>Magnésium</h3>
<p>Contribue à réduire l'irritabilité, les crampes musculaires et les troubles du sommeil. Une carence est très fréquente.</p>

<h3>Oméga-3</h3>
<p>Les acides gras oméga-3 (EPA/DHA) réduisent les bouffées de chaleur, soutiennent la santé cardiovasculaire et améliorent l'humeur.</p>

<h3>Vitamine E</h3>
<p>Un antioxydant qui aide à réduire la fréquence et l'intensité des bouffées de chaleur. À prendre le soir.</p>

<h2>Hygiène de vie : le socle incontournable</h2>
<p>Les modifications du mode de vie peuvent faire une grande différence.</p>
<p><strong>Alimentation</strong></p>
<ul>
  <li>Réduire les aliments déclencheurs : café, alcool, épices fortes, sucres raffinés</li>
  <li>Augmenter les légumineuses, les graines de lin (sources naturelles de phyto-œstrogènes)</li>
  <li>Calcium : lait, yaourt, fromage à pâte dure, sardines, amandes</li>
</ul>
<p><strong>Activité physique</strong></p>
<ul>
  <li>30 minutes de marche quotidienne</li>
  <li>Yoga et pilates pour la souplesse et la gestion du stress</li>
  <li>Musculation légère pour maintenir la densité osseuse</li>
</ul>
<p><strong>Gestion du stress</strong></p>
<ul>
  <li>Méditation de pleine conscience</li>
  <li>Cohérence cardiaque (5 minutes, 3 fois par jour)</li>
</ul>

<h2>Quand consulter un médecin ?</h2>
<p>Les alternatives naturelles peuvent soulager des symptômes modérés. Mais dans certains cas, une consultation médicale s'impose :</p>
<ul>
  <li>Bouffées de chaleur très invalidantes (plus de 7 par jour)</li>
  <li>Dépression caractérisée</li>
  <li>Saignements post-ménopausiques inexpliqués</li>
  <li>Douleurs osseuses ou articulaires intenses</li>
</ul>
<p>Votre médecin évaluera si un traitement hormonal de substitution est adapté à votre situation.</p>
<hr>
<p>À la Pharmacie Quartier des Hôpitaux, notre équipe peut vous conseiller sur les compléments alimentaires adaptés à votre situation. N'hésitez pas à venir nous consulter ou à nous envoyer vos questions sur WhatsApp.</p>$a3_body$,
'Bien-être',
'/images/articles/menopause-naturelle.webp',
'7 min de lecture',
true,
'2024-04-20 00:00:00+00'

)
ON CONFLICT (slug) DO NOTHING;
