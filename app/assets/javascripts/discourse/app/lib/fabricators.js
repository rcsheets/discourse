/*
Fabricators are used to create fake data for testing purposes.
The following fabricators are available in lib folder to allow
styleguide to use them, and eventually to generate dummy data
in a placeholder component. It should not be used for any other case.
*/

import { setOwner } from "@ember/application";
import ApplicationInstance from "@ember/application/instance";
import { service } from "@ember/service";
import { getLoadedFaker } from "discourse/lib/load-faker";

let sequence = 1;

export function incrementSequence() {
  return sequence++;
}

export default class CoreFabricators {
  @service store;

  constructor(owner) {
    if (owner && !(owner instanceof ApplicationInstance)) {
      throw new Error(
        "First argument of CoreFabricators constructor must be the owning ApplicationInstance"
      );
    }

    setOwner(this, owner);
  }

  category(args = {}) {
    const name = args.name || getLoadedFaker().faker.commerce.product();

    return this.store.createRecord("category", {
      id: args.id || incrementSequence(),
      color: args.color || getLoadedFaker().faker.color.rgb({ prefix: "" }),
      read_restricted: args.read_restricted ?? false,
      name,
      slug: args.slug || name.toLowerCase(),
    });
  }

  user(args = {}) {
    return this.store.createRecord("user", {
      id: args.id || incrementSequence(),
      username: args.username || getLoadedFaker().faker.person.firstName(),
      name: args.name,
      avatar_template: "/letter_avatar_proxy/v3/letter/t/41988e/{size}.png",
      suspended_till: args.suspended_till,
    });
  }

  bookmark(args = {}) {
    return this.store.createRecord("bookmark", {
      id: args.id || incrementSequence(),
    });
  }

  group(args = {}) {
    return this.store.createRecord("group", {
      name: args.name || getLoadedFaker().faker.word.noun(),
    });
  }

  upload() {
    return {
      extension: "jpeg",
      filesize: 126177,
      height: 800,
      human_filesize: "123 KB",
      id: incrementSequence(),
      original_filename: "avatar.PNG.jpg",
      retain_hours: null,
      short_path: "/images/avatar.png",
      short_url: "upload://yoj8pf9DdIeHRRULyw7i57GAYdz.jpeg",
      thumbnail_height: 320,
      thumbnail_width: 690,
      url: "/images/avatar.png",
      width: 1920,
    };
  }
}
