---
layout: page
title: ""
---
{% include JB/setup %}

## Bonjour !

Je me présente : Nicolas Grisey Demengel, développeur logiciel _passionné_ et _concerné_.

<div id="me">
  <img id="photo" src="img/photo.jpeg" alt="Photo de Nicolas" />
  <ul id="social">
    <li><a href="mailto:nicolas.demengel@gmail.com" title="Contactez-moi !" target="_blank"><img src="/img/iconmonstr-email-9-icon-48.png" alt="Logo Email" /></a></li>
    <li><a href="https://twitter.com/NicolasDemengel" title="Mon compte Twitter"><img alt="Logo Twitter" src="/img/iconmonstr-twitter-4-icon-48.png" /></a></li>
    <li><a href="https://github.com/ndemengel" title="Mon compte Github"><img alt="Logo Github" src="/img/iconmonstr-github-9-icon-48.png" /></a></li>
    <li><a href="http://www.linkedin.com/in/nicolasdemengel" title="Mon compte LinkedIn"><img alt="Logo LinkedIn" src="/img/iconmonstr-linkedin-4-icon-48.png" /></a></li>
  </ul>
</div>

### Credo

J'aime mon métier et cherche à l'exercer au mieux. J'aime la technique bien sûr, mais elle doit servir le produit : un logiciel doit avant toute chose répondre au besoin de ses utilisateurs !

Je crois au véritable travail d'équipe, où tous les membres se sentent _concernés_ par le produit et s'accordent sur des _valeurs_ pour le construire.

Ma conviction est que la profession de programmeur peut tendre vers une forme d'[artisanat](http://manifesto.softwarecraftsmanship.org/), et je m'emploie à mon niveau à ce qu'elle aille dans cette direction.  
J'essaye de me tenir à quelques principes de base &mdash; mettre le métier cible au centre du développment, faire au plus simple, travailler par petits incréments, obtenir du retour au plus tôt &mdash; et à cette fin m'impose une discipline constante : clean code, DDD/BDD (Domain and Behavior Driven Development), livraison continue.

Je cherche à m'améliorer de manière continue pour devenir un [meilleur](http://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/) collègue et développeur (mais ce n'est pas facile tous les jours).

### Compétences

Mes langages de programmation habituels sont **Java** et **[JavaScript](http://blog.xebia.fr/2012/04/12/javascript-core-par-nicolas-demengel-et-francois-sarradin/)**, que je pratique depuis mes débuts. J'ai eu également pas mal l'occasion de coder en **Python**. Je suis enfin très attiré par les langages **fonctionnels** ou tendant vers une approche fonctionnelle (Haskell, Clojure, Scala) mais je n'ai jamais eu l'occasion de les pratiquer sur des projets impactants. D'une manière générale, je développe une [certaine curiosité](http://blog.xebia.fr/2011/09/15/paradigmes-de-programmation-par-nicolas-demengel/) pour un bon nombre de langages.

Je suis un fervent défenseur de l'approche **DevOps** et du principe de **livraison continue**. Après plus d'un an passé les mains dans le cambouis, je [blogue un peu]({{ BASE_PATH }}/2014/05/15/continuous-delivery-recipes-introduction) sur ce sujet.

Par le passé j'ai donné quelques formations **TDD & Software Craftsmanship** pour [Xebia Training](http://training.xebia.fr/formations-java-jee/formation-tdd-software-craftsmanship.html). J'essaie aujourd'hui encore de partager ces compétences sur mon lieu de travail.


---

## Blog

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

