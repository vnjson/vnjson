import mcGet from "./mc-get.js";
import * as blockController from "./block-controller";

export default function () {}
/**
 * получаем блок
 */
vnjs.on("mc-get", mcGet);
/**
 * сравнение по ID
 */
vnjs.on("mc-get-block", blockController.mcGetBlockCommon);

/**
 * nbt
 */

vnjs.on("mc-get-block-nbt", blockController.mcGetBlockNBT);

/**
 * get chest
 */

vnjs.on("mc-get-store-slot", blockController.mcGetStoreSlot);

/**
 * get chest total items
 */
vnjs.on("mc-get-store-total", blockController.mcGetStoreTotal);
